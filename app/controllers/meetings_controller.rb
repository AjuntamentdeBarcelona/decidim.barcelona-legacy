class MeetingsController < ApplicationController
  load_and_authorize_resource
  respond_to :html, :json

  def index
    @filter = ResourceFilter.new(params, filter_date: true)
    @meetings = @filter.filter_collection(Meeting.all).includes(:category, :subcategory)

    if Setting["feature.meeting_tags"]
      @tag_cloud = @filter.tag_cloud(@meetings)
    end

    respond_to do |format|
      format.html
      format.json do 
        render json: {
          meetings: ActiveModel::ArraySerializer.new(@meetings, each_serializer: MeetingSerializer).as_json,
          filter: @filter,
          tag_cloud: @tag_cloud
        }
      end
    end
  end

  def show
    @meeting = Meeting.find(params[:id])
  end
end
