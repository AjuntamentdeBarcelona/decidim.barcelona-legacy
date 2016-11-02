class Admin::StepsController < Admin::BaseController
  before_filter :load_participatory_process
  before_filter :load_step, only: [:edit, :update, :destroy, :mark_as_active]
  authorize_resource

  before_action do
    authorize!(:manage, Step)
  end

  def index
    @steps = @participatory_process.steps.order(:position).with_hidden.page(params[:page])
  end

  def new
    @step = @participatory_process.steps.build
  end

  def create
    @step = @participatory_process.steps.build(strong_params)
    @step.active = @participatory_process.steps.count.zero?

    if @step.save
      redirect_to admin_participatory_process_steps_url, notice: t("flash.actions.create.notice", resource_name: "Step")
    else
      render :new
    end
  end

  def edit
  end

  def update
    if @step.update_attributes(strong_params)
      redirect_to admin_participatory_process_steps_url, notice: t("flash.actions.update.notice", resource_name: "Step")
    else
      render :edit
    end
  end

  def destroy
    @step.destroy
    redirect_to admin_participatory_process_steps_url, notice: t('flash.actions.destroy.notice', resource_name: "Step")
  end

  def restore
    @step = @participatory_process.steps.with_hidden.find(params[:id])
    @step.restore
    redirect_to admin_participatory_process_steps_url, notice: t('flash.actions.update.notice', resource_name: "Step")
  end

  def mark_as_active
    @participatory_process.steps.update_all(active: false)
    @step.update_attribute(:active, true)
    redirect_to admin_participatory_process_steps_url, notice: t('flash.actions.update.notice', resource_name: "Step")
  end

  private

  def load_participatory_process
    @participatory_process = ParticipatoryProcess.find(params[:participatory_process_id])
  end

  def load_step
    @step = @participatory_process.steps.find(params[:id])
  end

  def strong_params
    send("step_params")
  end

  def step_params
    params.require(:step)
      .permit(
        :position,
        :start_at,
        :end_at,
        :title => I18n.available_locales.map(&:to_s),
        :summary => I18n.available_locales.map(&:to_s),
        :description => I18n.available_locales.map(&:to_s),
        :flags => []
      )
  end
end
