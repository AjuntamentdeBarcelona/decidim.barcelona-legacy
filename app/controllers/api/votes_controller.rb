class Api::VotesController < Api::ApplicationController
  before_action :authenticate_user!
  load_and_authorize_resource :proposal

  def create
    authorize! :vote, @proposal
    unless @proposal.closed
      @proposal.register_vote(current_user, 'yes')
      @vote = Vote.where(voter: current_user, votable: @proposal).first
      render json: @vote
    else
      render json: { error: I18n.t('unauthorized.default') }, status: :forbidden
    end
  end
end
