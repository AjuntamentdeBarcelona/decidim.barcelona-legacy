class MeetingsController < ApplicationController
  load_and_authorize_resource
  respond_to :html, :json

  def index
    @filter = ResourceFilter.new(Meeting.upcoming, params)
    @meetings = @filter.collection

    respond_to do |format|
      format.html
      format.json do 
        render json: {
          meetings: ActiveModel::ArraySerializer.new(@meetings, each_serializer: MeetingSerializer).as_json,
          filter: @filter
        }
      end
    end
  end

  def show
    @meeting = Meeting.find(params[:id])
  end
end
