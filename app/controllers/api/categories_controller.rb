class Api::CategoriesController < Api::ApplicationController
  include Api::HasParticipatoryProcess
  load_and_authorize_resource

  def index
    @categories = Category.where(participatory_process_id: @participatory_process.try(:id)).all

    respond_to do |format|
      format.json { render json: @categories }
    end
  end
end
