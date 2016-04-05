class Api::CategoriesController < Api::ApplicationController
  load_and_authorize_resource

  def index
    @categories = Category.all

    respond_to do |format|
      format.json { render json: @categories }
    end
  end
end
