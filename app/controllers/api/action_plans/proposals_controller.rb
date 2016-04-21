class Api::ActionPlans::ProposalsController < Api::ApplicationController
  before_action :authenticate_user!
  load_and_authorize_resource :action_plan

  def index
    @proposals = @action_plan.proposals
    render json: @proposals
  end

  def create
    @proposal = Proposal.find(params[:proposal_id])
    @action_plan.proposals << @proposal
    @action_plan.save
    render json: @action_plan.proposals
  end

  def destroy
    @proposal = @action_plan.proposals.find(params[:id])
    @action_plan.proposals.delete(@proposal)
    render json: @action_plan.proposals
  end
end
