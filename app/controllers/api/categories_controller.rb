class Api::CategoriesController < Api::ApplicationController
  load_and_authorize_resource
  before_action :load_participation_process, only: [:index]

  def index
    @categories = Category.where(participatory_process_id: @participatory_process.try(:id)).all

    respond_to do |format|
      format.json { render json: @categories }
    end
  end
end
