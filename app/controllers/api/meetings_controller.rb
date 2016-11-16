class Api::MeetingsController < Api::ApplicationController
  include Api::HasParticipatoryProcess
  load_and_authorize_resource

  def index
    if params[:proposal_id]
      proposal = Proposal.find(params[:proposal_id])
      @meetings = proposal.meetings.includes(:tags, :proposals, :pictures)

      render json: @meetings
    else
      meetings = Meeting.all
      meetings = meetings
                 .where(participatory_process: @participatory_process)
                 .includes(participatory_process: [:steps])

      unless params[:filter].present?
        default_date_filter = if meetings.upcoming.count.zero?
                                "past"
                              else
                                "upcoming"
                              end
      end

      filter = ResourceFilter.new(params, filter_date: true)

      @meetings = filter.filter_collection(meetings.includes(:category, :subcategory))
      tag_cloud = filter.tag_cloud(@meetings)

      render json: @meetings, meta: {
        tag_cloud: tag_cloud,
        default_date_filter: default_date_filter
      }
    end
  end
end
