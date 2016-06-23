class Api::SubcategoriesController < Api::ApplicationController
  include Api::HasParticipatoryProcess
  load_and_authorize_resource

  def index
    @subcategories = Subcategory.where(participatory_process_id: @participatory_process.try(:id)).order(:position).all

    respond_to do |format|
      format.json { render json: @subcategories }
    end
  end
end
