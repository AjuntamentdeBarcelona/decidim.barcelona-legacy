class Api::ActionPlans::ProposalsController < Api::ApplicationController
  load_and_authorize_resource :action_plan

  def index
    @action_plans_proposals = @action_plan.action_plans_proposals
      .includes(:proposal => [
        { author: :organization },
        :category,
        :subcategory,
        :comments,
        :flags,
        :votes_for
      ])

    render json: @action_plans_proposals, root: 'action_plans_proposals'
  end

  def create
    @proposal = Proposal.find(params[:proposal_id])
    @action_plan.proposals << @proposal
    @action_plan.save
    ActionPlanStatisticsWorker.perform_async(@action_plan.id)
    render json: @action_plan.action_plans_proposals, root: 'action_plans_proposals'
  end

  def update
    ActionPlansProposal.where(
      action_plan_id: params[:action_plan_id],
      proposal_id: params[:id]
    ).update_all(level: params[:level])

    @action_plan = ActionPlan.find(params[:action_plan_id])
    render json: @action_plan.action_plans_proposals, root: 'action_plans_proposals'
  end

  def destroy
    @proposal = @action_plan.proposals.find(params[:id])
    @action_plan.proposals.delete(@proposal)
    ActionPlanStatisticsWorker.perform_async(@action_plan.id)
    render json: @action_plan.action_plans_proposals, root: 'action_plans_proposals'
  end
end
