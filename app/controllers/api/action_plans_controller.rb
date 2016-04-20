class Api::ActionPlansController < Api::ApplicationController
  include HasOrders

  before_action :authenticate_user!
  load_and_authorize_resource

  def index
    set_seed

    action_plans = @current_order == "recommended" ? Recommender.new(current_user).action_plans : ActionPlan.all

    @action_plans = ResourceFilter.new(params, user: current_user)
      .filter_collection(action_plans.includes(:category, :subcategory))
      .send("sort_by_created_at")
      .page(params[:page])
      .per(15)

    respond_to do |format|
      format.json { 
        render json: @action_plans, meta: {
          seed: @random_seed,
          current_page: @action_plans.current_page,
          next_page: @action_plans.next_page,
          prev_page: @action_plans.prev_page,
          total_pages: @action_plans.total_pages,
          total_count: @action_plans.total_count
        }
      }
    end
  end

  def update
    @action_plan = ActionPlan.find(params[:id])
    @action_plan.assign_attributes(strong_params)
    @action_plan.save!
    render json: @action_plan
  end

  def destroy
    @action_plan = ActionPlan.find(params[:id])
    @action_plan.destroy!
    render nothing: true
  end

  def show
    render json: @action_plan
  end

  def proposals
    @proposals = @action_plan.proposals
    render json: @proposals, root: 'proposals'
  end

  private

  def strong_params
    permitted_params = []
    permitted_params += [:approved] if can?(:approve, ActionPlan)
    params.require(:action_plan).permit(permitted_params)
  end

  def set_seed
    @random_seed = params[:random_seed] ? params[:random_seed].to_f : (rand * 2 - 1)
    ActionPlan.connection.execute "select setseed(#{@random_seed})"
  end
end
