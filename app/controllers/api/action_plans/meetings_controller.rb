class Api::ActionPlans::MeetingsController < Api::ApplicationController
  load_and_authorize_resource :action_plan

  def index
    @meetings = @action_plan.proposals.collect(&:meetings).flatten
    render json: @meetings
  end
end
