class ParticipatoryProcessesController < ApplicationController
  authorize_resource :participatory_process, except: :list
  skip_authorization_check only: [:list]

  def index
    participatory_processes = ParticipatoryProcess.published.order("created_at desc").all
    @participatory_processes = participatory_processes.decorate
    @featured_participatory_processes = participatory_processes.featured.decorate

    respond_to do |format|
      format.html
    end
  end

  def list
    @participatory_processes = ParticipatoryProcess.published.order("created_at desc").decorate
  end

  def show
    @participatory_process = ParticipatoryProcess.find(params[:id])
    authorize! :read, @participatory_process
    @active_step = @participatory_process.active_step
    @participatory_process = @participatory_process.decorate
  end
end
