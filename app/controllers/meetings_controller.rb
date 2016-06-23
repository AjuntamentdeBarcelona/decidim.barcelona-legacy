class MeetingsController < ApplicationController
  include HasParticipatoryProcess
  load_and_authorize_resource
  respond_to :html, :json

  def index
  end

  def show
    @meeting = Meeting.find(params[:id])
  end
end
