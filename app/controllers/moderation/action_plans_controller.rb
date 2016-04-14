class Moderation::ActionPlansController < Moderation::BaseController
  include ModerateActions

  has_filters %w{all}, only: :index
  has_orders %w{created_at}, only: :index

  before_action :load_resources, only: [:index]

  load_and_authorize_resource

  def index
    @resources = @resources.send(@current_filter)
    @resources = @resources.search(params[:search]) if params[:search].present?
    @resources = @resources.page(params[:page]).per(50)
    set_resources_instance
  end

  def new
    @resource = resource_model.new
    set_resource_instance
  end

  def build_from_proposal
    @proposal = Proposal.find(params[:proposal_id])
    @references = Reference.references_for(@proposal)
    @resource = resource_model.new(proposal_ids: @references.collect(&:id) + [@proposal.id])
    @resource.revisions.build(title: @proposal.title, description: @proposal.summary)
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

    if @resource.save
      @resource.revisions.create(params.require(:action_plan_revision).permit(:title, :description, :author_id))
      redirect_to moderation_action_plans_url, notice: t('flash.actions.create.notice', resource_name: "#{resource_name.capitalize}")
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
      redirect_to moderation_action_plans_url, notice: t('flash.actions.update.notice', resource_name: "#{resource_name.capitalize}")
    else
      set_resource_instance
      render :edit
    end
  end

  def destroy
    resource.destroy
    redirect_to moderation_action_plans_url, notice: t('flash.actions.destroy.notice', resource_name: "#{resource_name.capitalize}")
  end

  private

  def action_plan_params
    params.require(:action_plan).permit(:category_id, :subcategory_id, :scope, :district, :proposal_ids => [])
  end

  def resource_model
    ActionPlan
  end
end
