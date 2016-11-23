class Api::VotesController < Api::ApplicationController
  before_action :authenticate_user!
  load_and_authorize_resource :proposal

  def create
    authorize! :vote, @proposal
    step = @proposal.participatory_process.steps.where(id: params[:step_id]).first
    raise "Unauthorized" unless user_can_vote?(step)
    @proposal.register_vote(current_user, "yes")
    @vote = Vote.where(voter: current_user, votable: @proposal).first
    render json: @vote
  end

  def destroy
    authorize! :unvote, @proposal
    step = @proposal.participatory_process.steps.where(id: params[:step_id]).first
    raise "Unauthorized" unless user_can_unvote?(step)
    @vote = Vote.where(voter: current_user, votable: @proposal).first
    @vote.destroy
    render json: @vote
  end

  private

  def user_can_vote?(step)
    vote_limit_reached = if step.proposal_vote_limit > 0
                           proposal_votes_count = current_user.proposal_votes(step.participatory_process.proposals).keys.count
                           proposal_votes_count >= step.proposal_vote_limit
                         end

    !vote_limit_reached && !step.feature_enabled?(:proposals_readonly) && step.feature_enabled?(:enable_proposal_votes)
  end

  def user_can_unvote?(step)
    step.feature_enabled?(:enable_proposal_unvote)
  end
end
