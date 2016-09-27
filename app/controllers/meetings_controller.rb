class MeetingsController < ApplicationController
  before_filter { |c| c.check_participatory_process_flags :meetings }

  load_and_authorize_resource
  respond_to :html, :json

  layout "participatory_process"

  def index
  end

  def show
    @meeting = Meeting.find(params[:id])
  end
end
