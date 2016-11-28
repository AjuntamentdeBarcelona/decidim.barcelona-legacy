class Api::CommentsController < Api::ApplicationController
  before_action :authenticate_user!, except: [:index]
  before_action :load_commentable, only: :create
  before_action :build_comment, only: :create

  load_resource
  authorize_resource except: [:upvote, :downvote]

  def index
    @current_order = params[:order] || 'most_voted'
    @root_comments = Comment.includes(:user).where({
      ancestry: nil,
      commentable_id: params[:commentable][:id],
      commentable_type: params[:commentable][:type]
    })
    .send("sort_by_#{@current_order}")
    .page(params[:page])
    .per(20)

    child_comments = []
    @root_comments.each do |comment|
      child_comments << Comment.descendants_of(comment).send("sort_by_#{@current_order}")
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
    raise "Unauthorized" unless user_can_comment?
    if can?(:comment, @commentable) && @comment.save
      CommentNotifier.new(comment: @comment).process
      CommentReferencesWorker.perform_async(@comment.id)
      add_notification @comment
      render json: @comment
    end
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

  def upvote
    authorize! :vote, @comment
    @comment.vote_by(voter: current_user, vote: 'yes')
    render json: @comment
  end

  def downvote
    authorize! :vote, @comment
    @comment.vote_by(voter: current_user, vote: 'no')
    render json: @comment
  end

  def hide
    @comment.hide
    Activity.log(current_user, :hide, @comment)
    render json: @comment
  end

  private

  def load_commentable
    @commentable = Comment.find_commentable(params[:commentable][:type], params[:commentable][:id])
  end

  def build_comment
    @comment = Comment.build(@commentable, current_user, comment_params)
    check_for_special_comments
  end

  def check_for_special_comments
    if comment_params[:as_administrator]
      @comment.administrator_id = current_user.id
    elsif comment_params[:as_moderator]
      @comment.moderator_id = current_user.id
    end
  end

  def comment_params
    permits = [:parent_id, :body]
    permits << :as_moderator if can? :comment_as_moderator, @commentable
    permits << :as_administrator if can? :comment_as_administrator, @commentable
    permits << :alignment if @commentable.arguable? && params[:comment][:parent_id].blank?
    params.require(:comment).permit(*permits)
  end

  def add_notification(comment)
    if comment.reply?
      notifiable = comment.parent
    else
      notifiable = comment.commentable
    end
    if notifiable.try(:author_id)
      Notification.add(notifiable.author.id, notifiable) unless comment.author == notifiable.author
    end
  end

  def user_can_comment?
    step = Step.find(params[:step_id])
    params[:commentable][:type].downcase != "proposal" || step.feature_enabled?(:enable_proposal_comments)
  end
end
