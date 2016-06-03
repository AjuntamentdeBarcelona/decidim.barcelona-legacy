class Api::DebatesController < Api::ApplicationController
  load_and_authorize_resource

  def show
    render json: @debate
  end
end
