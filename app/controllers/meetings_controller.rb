class MeetingsController < ApplicationController
  before_filter { |c| c.check_participatory_process_flags :meetings }

  load_and_authorize_resource
  respond_to :html, :json

  def index
  end

  def show
    @meeting = Meeting.find(params[:id])
  end
end
