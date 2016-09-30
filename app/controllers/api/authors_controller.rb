class Api::AuthorsController < Api::ApplicationController
  skip_authorization_check

  def show
    @author = User.find(params[:id])
    render json: @author
  end
end