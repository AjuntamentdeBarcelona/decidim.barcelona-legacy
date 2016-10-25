class Admin::ParticipatoryProcessesController < Admin::BaseController
  has_filters %w{published unpublished}, only: :index

  before_filter :load_participatory_process, only: [:show, :edit, :update, :destroy, :publish, :unpublish]

  authorize_resource

  before_action do
    authorize!(:manage, ParticipatoryProcess)
  end

  def index
    @participatory_processes = ParticipatoryProcess.send(@current_filter).with_hidden.page(params[:page]).decorate
  end

  def show
    @pp = ParticipatoryProcess.find(params[:id]).decorate
  end

  def new
    @participatory_process = ParticipatoryProcess.new
  end

  def create
    @participatory_process = ParticipatoryProcess.new(strong_params)

    if @participatory_process.save
      redirect_to admin_participatory_processes_url(filter: @current_filter), notice: t('flash.actions.create.notice', resource_name: "Participatory process")
    else
      render :new
    end
  end

  def edit
  end

  def update
    @participatory_process.assign_attributes(strong_params)
    if @participatory_process.save
      redirect_to admin_participatory_processes_url(filter: @current_filter), notice: t('flash.actions.update.notice', resource_name: "Participatory process")
    else
      render :edit
    end
  end

  def destroy
    @participatory_process.destroy
    redirect_to admin_participatory_processes_url(filter: @current_filter), notice: t('flash.actions.destroy.notice', resource_name: "Participatory process")
  end

  def restore
    @participatory_process = ParticipatoryProcess.with_hidden.find(params[:id])
    @participatory_process.restore
    redirect_to admin_participatory_processes_url(filter: @current_filter), notice: t('flash.actions.update.notice', resource_name: "Participatory process")
  end

  def publish
    change_participatory_process_published_flag_to(true)
  end

  def unpublish
    change_participatory_process_published_flag_to(false)
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
        :hashtag,
        :areas,
        :scope,
        :participatory_structure,
        :district,
        :full_image,
        :banner_image,
        :featured,
        :title => I18n.available_locales.map(&:to_s),
        :subtitle => I18n.available_locales.map(&:to_s),
        :summary => I18n.available_locales.map(&:to_s),
        :description => I18n.available_locales.map(&:to_s)
      )
  end

  def load_participatory_process
    @participatory_process = ParticipatoryProcess.find(params[:id])
  end

  def change_participatory_process_published_flag_to(value)
    @participatory_process.update_attribute(:published, value)
    redirect_to admin_participatory_processes_url(filter: value ? :published : :unpublished),
                notice: t('flash.actions.update.notice', resource_name: "Participatory process")
  end
end
