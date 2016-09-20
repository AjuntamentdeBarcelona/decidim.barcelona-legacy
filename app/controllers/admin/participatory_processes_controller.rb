class Admin::ParticipatoryProcessesController < Admin::BaseController
  authorize_resource

  def index
    @participatory_processes = ParticipatoryProcess.page(params[:page])
  end

  def new
    @new_participatory_process = ParticipatoryProcess.new
  end

  def create
    @new_participatory_process = ParticipatoryProcess.new(strong_params)

    if @new_participatory_process.save
      redirect_to admin_participatory_processes_url, notice: t('flash.actions.create.notice', resource_name: "ParticipatoryProcess")
    else
      render :new
    end
  end

  def edit
    @edit_participatory_process = ParticipatoryProcess.find(params[:id])
  end

  def update
    @edit_participatory_process = ParticipatoryProcess.find(params[:id])
    @edit_participatory_process.assign_attributes(strong_params)
    if @edit_participatory_process.save
      redirect_to admin_participatory_processes_url, notice: t('flash.actions.update.notice', resource_name: "ParticipatoryProcess")
    else
      render :edit
    end
  end

  def destroy
    @destroy_participatory_process = ParticipatoryProcess.find(params[:id])
    @destroy_participatory_process.destroy
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
