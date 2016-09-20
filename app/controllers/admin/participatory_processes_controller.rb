class Admin::ParticipatoryProcessesController < Admin::BaseController
  load_and_authorize_resource

  def index
    @participatory_processes = @participatory_processes.page(params[:page])
  end

  def new
    @participatory_process = ParticipatoryProcess.new
  end

  def create
    @participatory_process = ParticipatoryProcess.new(strong_params)

    if @participatory_process.save
      redirect_to admin_participatory_processes_url, notice: t('flash.actions.create.notice', resource_name: "ParticipatoryProcess")
    else
      render :new
    end
  end

  def edit
  end

  def update
    @participatory_process.assign_attributes(strong_params)
    if @participatory_process.save
      redirect_to admin_participatory_processes_url, notice: t('flash.actions.update.notice', resource_name: "ParticipatoryProcess")
    else
      render :edit
    end
  end

  def destroy
    @participatory_process.destroy
    redirect_to admin_participatory_processes_url, notice: t('flash.actions.destroy.notice', resource_name: "ParticipatoryProcess")
  end

  private

  def strong_params
    send("participatory_process_params")
  end

  def participatory_process_params
    params.require(:participatory_process).permit(:name, :slug)
  end
end
