class Api::MeetingsController < Api::ApplicationController
  before_action :load_participation_process, only: [:index]
  load_and_authorize_resource

  def index
    if params[:proposal_id]
      proposal = Proposal.find(params[:proposal_id])
      @meetings = proposal.meetings.includes(:tags, :proposals, :pictures)

      render json: @meetings
    else
      meetings = Meeting.all
      meetings = meetings.where(participatory_process_id: @participatory_process.try(:id))
      filter = ResourceFilter.new(params, filter_date: true)

      @meetings = filter.filter_collection(meetings.includes(:category, :subcategory))
      tag_cloud = filter.tag_cloud(@meetings)

      render json: @meetings, meta: {
        tag_cloud: tag_cloud
      }
    end
  end
end
