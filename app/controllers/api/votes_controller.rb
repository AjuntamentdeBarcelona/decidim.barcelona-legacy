class Api::VotesController < ApplicationController
  skip_authorization_check
  serialization_scope :view_context
  skip_before_action :verify_authenticity_token
  before_action :authenticate_user!
  before_action :load_proposal
  respond_to :json

  def create
    @proposal.register_vote(current_user, 'yes')
    @vote = Vote.where(voter: current_user, votable: @proposal).first
    render json: @vote
  end

  private

  def load_proposal
    @proposal = Proposal.find(params[:proposal_id])
  end
end
