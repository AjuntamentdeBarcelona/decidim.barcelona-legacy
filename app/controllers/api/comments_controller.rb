class Api::CommentsController < Api::ApplicationController
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
end
