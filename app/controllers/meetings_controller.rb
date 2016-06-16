class MeetingsController < ApplicationController
  load_and_authorize_resource
  respond_to :html, :json

  before_action :load_participation_process

  def index
  end

  def show
    @meeting = Meeting.find(params[:id])
  end
end
