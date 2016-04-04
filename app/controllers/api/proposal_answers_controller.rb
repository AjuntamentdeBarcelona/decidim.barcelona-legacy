class Api::ProposalAnswersController < Api::ApplicationController
  load_and_authorize_resource :proposal
  #before_action :authenticate_user!

  def create
    @answer = @proposal.create_proposal_answer(strong_params)
    set_response
  end

  def update
    @answer = @proposal.answer
    @answer.update_attributes(strong_params)
    set_response
  end

  private

  def strong_params
    permitted_params = [:message, :status]
    params.require(:proposal_answer).permit(permitted_params)
  end

  def set_response
    if @answer.valid?
      render json: @answer
    else
      render json: { errors: @answer.errors }, status: :unprocessable_entity
    end
  end
end
