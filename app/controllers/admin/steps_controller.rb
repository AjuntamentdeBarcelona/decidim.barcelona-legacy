class Admin::StepsController < Admin::BaseController
  include HasParticipatoryProcess
  authorize_resource

  def index
    @steps = @participatory_process.steps.with_hidden.page(params[:page])
  end

  def new
    @step = @participatory_process.steps.build
  end

  def create
    @step = @participatory_process.steps.build(strong_params)

    if @step.save
      redirect_to admin_participatory_process_steps_url, notice: t("flash.actions.create.notice", resource_name: "Step")
    else
      render :new
    end
  end

  private

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
        :description => I18n.available_locales.map(&:to_s)
      )
  end
end