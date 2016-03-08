class Api::VotesController < ApplicationController
  skip_authorization_check
  before_action :authenticate_user!
  before_action :load_proposal
  respond_to :json

  def create
    @proposal.register_vote(current_user, 'yes')
    respond_to do |format|
      format.json do
        render json: { total_votes: @proposal.total_votes }
      end
    end
  end

  private

  def load_proposal
    @proposal = Proposal.find(params[:proposal_id])
  end
end
