class Api::VotesController < Api::ApplicationController
  before_action :authenticate_user!
  load_and_authorize_resource :proposal

  def create
    authorize! :vote, @proposal
    @proposal.register_vote(current_user, 'yes')
    @vote = Vote.where(voter: current_user, votable: @proposal).first
    render json: @vote
  end
end
