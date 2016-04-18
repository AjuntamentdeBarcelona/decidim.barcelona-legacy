class ActionPlansController < ApplicationController
  load_and_authorize_resource
  respond_to :html, :json

  def index
  end
end
