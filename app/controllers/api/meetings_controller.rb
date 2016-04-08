class Api::MeetingsController < Api::ApplicationController
  load_and_authorize_resource

  def index
    if params[:proposal_id]
      proposal = Proposal.find(params[:proposal_id])
      @meetings = proposal.meetings

      render json: @meetings
    else
      meetings = Meeting.all
      filter = ResourceFilter.new(params, filter_date: true)

      @meetings = filter.filter_collection(meetings.includes(:category, :subcategory))
      tag_cloud = filter.tag_cloud(@meetings)

      @meetings = @meetings.page(params[:page]).per(15)

      render json: @meetings, meta: {
        tag_cloud: tag_cloud,
        current_page: @meetings.current_page,
        next_page: @meetings.next_page,
        prev_page: @meetings.prev_page,
        total_pages: @meetings.total_pages,
        total_count: @meetings.total_count
      }
    end
  end
end
