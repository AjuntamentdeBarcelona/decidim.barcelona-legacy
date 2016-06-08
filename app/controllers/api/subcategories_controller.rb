class Api::SubcategoriesController < Api::ApplicationController
  load_and_authorize_resource

  def index
    @subcategories = Subcategory.all

    respond_to do |format|
      format.json { render json: @subcategories }
    end
  end
end
