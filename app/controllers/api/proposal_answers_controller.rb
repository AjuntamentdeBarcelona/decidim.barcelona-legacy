class Api::ProposalAnswersController < Api::ApplicationController
  before_action :authenticate_user!
  load_and_authorize_resource :proposal

  def show
    @answer = @proposal.answer
    render json: @answer
  end

  def create
    @answer = @proposal.build_answer(strong_params)
    authorize! :create, @answer
    @answer.save
    set_response
  end

  def update
    @answer = @proposal.answer
    authorize! :update, @answer
    @answer.update_attributes(strong_params)
    set_response
  end

  private

  def strong_params
    permitted_params = [:message, :status, :official]
    params.require(:answer).permit(permitted_params)
  end

  def set_response
    if @answer.valid?
      render json: @answer
    else
      render json: { errors: @answer.errors }, status: :unprocessable_entity
    end
  end
end
