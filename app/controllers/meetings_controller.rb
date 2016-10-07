class MeetingsController < ApplicationController
  include ParticipatoryProcessFlags

  ensure_participatory_process_flag :meetings

  load_and_authorize_resource
  respond_to :html, :json

  layout "participatory_process"

  def index
  end

  def show
    @meeting = Meeting.find(params[:id])
  end
end
