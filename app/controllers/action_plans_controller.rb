class ActionPlansController < ApplicationController
  respond_to :html, :json

  def index
  end

  def show
    @action_plan_id = params[:id]
  end
end
