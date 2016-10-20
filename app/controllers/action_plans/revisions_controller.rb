class ActionPlans::RevisionsController < ApplicationController
  include HasParticipatoryProcess
  include ModerateActions

  has_filters %w{all}, only: :index
  has_orders %w{created_at}, only: :index

  load_and_authorize_resource :action_plan
  load_and_authorize_resource :action_plan_revision, :through => :action_plan

  before_action :load_resources, only: [:index]

  def index
    @resources = @resources.where(action_plan_id: @action_plan.id).send(@current_filter)
    @resources = @resources.search(params[:search]) if params[:search].present?
    @resources = @resources.page(params[:page]).per(50)
    set_resources_instance
  end

  def new
    @resource = resource_model.new(title: @action_plan.title, description: @action_plan.description)
    set_resource_instance
  end

  def create
    @resource = resource_model.new(strong_params)
    @resource.action_plan = @action_plan
    @resource.author = current_user

    if @resource.save
      redirect_to action_plan_url(@action_plan, participatory_process_id: @action_plan.participatory_process), notice: t('flash.actions.create.notice', resource_name: "#{resource_name.capitalize}")
    else
      set_resource_instance
      render :new
    end
  end

  private

  def action_plan_revision_params
    params.require(:action_plan_revision).permit(:title, :description)
  end

  def resource_model
    ActionPlanRevision
  end
end
