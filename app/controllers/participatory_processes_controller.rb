class ParticipatoryProcessesController < ApplicationController
  authorize_resource :participatory_process

  def index
    participatory_processes = ParticipatoryProcess.published.order("created_at desc").all
    @participatory_processes = participatory_processes.decorate
    @featured_participatory_processes = participatory_processes.featured.decorate
  end

  def show
    @participatory_process = ParticipatoryProcess.find(params[:id]).decorate
  end
end
