class ParticipatoryProcessesController < ApplicationController
  skip_authorization_check
  skip_before_filter :participatory_process

  def index
    @participatory_processes = ParticipatoryProcess.all
  end

  def show
    @participatory_process = ParticipatoryProcess.find(params[:id]).decorate
  end
end