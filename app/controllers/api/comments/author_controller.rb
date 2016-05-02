class Api::Comments::AuthorController < Api::ApplicationController
  before_action :authenticate_user!
  load_and_authorize_resource :comment
  load_and_authorize_resource :author, :through => :comment, :singleton => true

  def hide
    @author.block
    Activity.log(current_user, :block, @author)
    render json: @comment
  end
end
