class Admin::ParticipatoryProcessesController < Admin::BaseController
  authorize_resource

  def index
    @participatory_processes = ParticipatoryProcess.with_hidden.page(params[:page])
  end

  def new
    @new_participatory_process = ParticipatoryProcess.new
  end

  def create
    @new_participatory_process = ParticipatoryProcess.new(strong_params)

    if @new_participatory_process.save
      redirect_to admin_participatory_processes_url, notice: t('flash.actions.create.notice', resource_name: "Participatory process")
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
      redirect_to admin_participatory_processes_url, notice: t('flash.actions.update.notice', resource_name: "Participatory process")
    else
      render :edit
    end
  end

  def destroy
    @destroy_participatory_process = ParticipatoryProcess.find(params[:id])
    @destroy_participatory_process.destroy
    redirect_to admin_participatory_processes_url, notice: t('flash.actions.destroy.notice', resource_name: "Participatory process")
  end

  def restore
    @restore_participatory_process = ParticipatoryProcess.with_hidden.find(params[:id])
    @restore_participatory_process.restore
    redirect_to admin_participatory_processes_url, notice: t('flash.actions.update.notice', resource_name: "Participatory process")
  end

  private

  def strong_params
    send("participatory_process_params")
  end

  def participatory_process_params
    params.require(:participatory_process)
      .permit(
        :name, 
        :slug, 
        :admin_name, 
        :admin_email, 
        :audience,
        :citizenship_scope,
        :manager_group,
        :areas,
        :scope,
        :district,
        :full_image,
        :banner_image,
        :title => I18n.available_locales.map(&:to_s),
        :subtitle => I18n.available_locales.map(&:to_s),
        :summary => I18n.available_locales.map(&:to_s),
        :description => I18n.available_locales.map(&:to_s)
      )
  end
end
