class Api::CommentsController < Api::ApplicationController
  load_and_authorize_resource

  def index
    comments = Comment.where({
      ancestry: nil,
      commentable_id: params[:commentable][:id],
      commentable_type: params[:commentable][:type]
    })
    .page(params[:page])
    .per(15)

    render json: comments
  end
end
