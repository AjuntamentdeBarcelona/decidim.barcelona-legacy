class Api::SubcategoriesController < Api::ApplicationController
  load_and_authorize_resource
  before_action :load_participation_process, only: [:index]

  def index
    @subcategories = Subcategory.where(participatory_process_id: @participatory_process.try(:id)).order(:position).all

    respond_to do |format|
      format.json { render json: @subcategories }
    end
  end
end
