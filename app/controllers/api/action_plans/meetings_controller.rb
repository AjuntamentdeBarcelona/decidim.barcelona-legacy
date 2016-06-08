class Api::ActionPlans::MeetingsController < Api::ApplicationController
  load_and_authorize_resource :action_plan

  def index
    meeting_ids = @action_plan.proposals
    .includes(:meetings)
    .collect(&:meeting_ids)
    .flatten

    @meetings = Meeting.includes(:category, :subcategory).where(id: meeting_ids)

    render json: @meetings
  end
end
