class Api::VotesController < Api::ApplicationController
  before_action :authenticate_user!
  load_and_authorize_resource :proposal

  def create
    authorize! :vote, @proposal
    step = @proposal.participatory_process.steps.where(id: params[:step_id]).first
    raise "Unauthorized" if step.feature_enabled?(:proposals_readonly) || !step.feature_enabled?(:enable_proposal_votes)
    @proposal.register_vote(current_user, 'yes')
    @vote = Vote.where(voter: current_user, votable: @proposal).first
    render json: @vote
  end
end
