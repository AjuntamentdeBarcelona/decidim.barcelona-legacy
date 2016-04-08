class Api::AuthorController < Api::ApplicationController
  before_action :authenticate_user!
  load_and_authorize_resource :proposal
  load_and_authorize_resource :author, :through => :proposal, :singleton => true

  def hide
    @author.block
    Activity.log(current_user, :block, @author)
    render json: @author
  end
end
