class Api::CommentsController < Api::ApplicationController
  before_action :load_commentable, only: :create
  before_action :build_comment, only: :create

  load_and_authorize_resource

  def index
    @root_comments = Comment.includes(:user).where({
      ancestry: nil,
      commentable_id: params[:commentable][:id],
      commentable_type: params[:commentable][:type]
    })
    .sort_by_most_voted
    .page(params[:page])
    .per(20)

    child_comments = []
    @root_comments.each do |comment|
      child_comments << Comment.descendants_of(comment)
    end

    comments = (@root_comments + child_comments).flatten

    respond_to do |format|
      format.json { 
        render json: comments, meta: {
          current_page: @root_comments.current_page,
          next_page: @root_comments.next_page,
          prev_page: @root_comments.prev_page,
          total_pages: @root_comments.total_pages,
          total_count: @root_comments.total_count
        }
      }
    end
  end

  def create
    @comment.save
    render json: @comment
    #if can?(:comment, @commentable) && @comment.save
    #  CommentNotifier.new(comment: @comment).process
    #  CommentReferencesWorker.perform_async(@comment.id)
    #  add_notification @comment
    #else
    #  render :new
    #end
  end

  def flag
    Flag.flag(current_user, @comment)
    #set_comment_flags(@comment)
    render json: @comment
  end

  def unflag
    Flag.unflag(current_user, @comment)
    #set_comment_flags(@comment)
    render json: @comment
  end

  private

  def load_commentable
    @commentable = Comment.find_commentable(params[:commentable][:type], params[:commentable][:id])
  end
  
  def build_comment
    @comment = Comment.build(@commentable, current_user, comment_params)
    #check_for_special_comments
  end

  #def check_for_special_comments
  #  if administrator_comment?
  #    @comment.administrator_id = current_user.id
  #  elsif moderator_comment?
  #    @comment.moderator_id = current_user.id
  #  end
  #end

  def comment_params
    permits = [:parent_id, :body, :as_moderator, :as_administrator]
    permits << :alignment if @commentable.arguable? && params[:comment][:parent_id].blank?
    params.require(:comment).permit(*permits)
  end

  #def set_comment_flags(comments)
  #  @comment_flags = current_user ? current_user.comment_flags(comments) : {}
  #end
end
