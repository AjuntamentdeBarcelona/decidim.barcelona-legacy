class ParticipatoryProcessesController < ApplicationController
  skip_authorization_check
  skip_before_filter :participatory_process

  layout -> { params[:action] == 'show' ? "participatory_process" : "application" }

  def index
    @participatory_processes = ParticipatoryProcess.published.all.decorate
  end

  def show
    @participatory_process = ParticipatoryProcess.published.find(params[:id]).decorate
  end
end
