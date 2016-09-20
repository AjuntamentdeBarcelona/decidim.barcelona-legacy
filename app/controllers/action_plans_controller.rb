class ActionPlansController < ApplicationController
  include ModerateActions

  load_and_authorize_resource
  respond_to :html, :json

  def index
  end

  def show
    @action_plan_id = params[:id]
    @action_plan = ActionPlan.find(@action_plan_id)
  end

  def new
    @resource = resource_model.new
    @resource.revisions.build
    set_resource_instance
  end

  def build_from_proposal
    @proposal = Proposal.find(params[:proposal_id])
    @references = Reference.references_for(@proposal)

    @resource = resource_model.new({
      participatory_process_id: @proposal.participatory_process_id,
      proposals: @references.select{ |r| r.class == Proposal } + [@proposal],
      scope: @proposal.scope,
      district: @proposal.district,
      category_id: @proposal.category_id,
      subcategory_id: @proposal.subcategory_id
    })

    @resource.revisions.build({
      title: @proposal.title, 
      description: @proposal.summary
    })

    set_resource_instance
    render :new
  end

  def create
    params[:action_plan_revision] = {
      title: params[:action_plan].delete(:title),
      description: params[:action_plan].delete(:description),
      author_id: current_user.id
    }

    @resource = resource_model.new(strong_params)
    @resource.participatory_process_id = @participatory_process.id if @participatory_process.present?
    @resource.revisions.new(params.require(:action_plan_revision).permit(:title, :description, :author_id))

    if @resource.save
      ActionPlanStatisticsWorker.perform_async(@resource.id)
      redirect_to action_plan_url(@resource, participatory_process_id: @resource.participatory_process.slug), notice: t('flash.actions.create.notice', resource_name: "#{resource_name.capitalize}")
    else
      set_resource_instance
      render :new
    end
  end

  def edit
  end

  def update
    resource.assign_attributes(strong_params)
    if resource.save
      ActionPlanStatisticsWorker.perform_async(resource.id)
      redirect_to action_plan_url(resource), notice: t('flash.actions.update.notice', resource_name: "#{resource_name.capitalize}")
    else
      set_resource_instance
      render :edit
    end
  end

  def destroy
    resource.destroy
    redirect_to action_plans_url, notice: t('flash.actions.destroy.notice', resource_name: "#{resource_name.capitalize}")
  end

  private

  def action_plan_params
    params.require(:action_plan).permit(:category_id, :subcategory_id, :scope, :district, :proposal_ids => [])
  end

  def resource_model
    ActionPlan
  end
end
