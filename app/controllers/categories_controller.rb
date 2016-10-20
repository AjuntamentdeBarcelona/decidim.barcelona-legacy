class CategoriesController < ApplicationController
  include HasParticipatoryProcess
  skip_authorization_check

  layout "participatory_process"

  def index
    categories = @participatory_process.categories.includes(:subcategories)
    @last_modified = [
      @participatory_process.categories.maximum(:updated_at),
      @participatory_process.subcategories.maximum(:updated_at)
    ].max
    @categories ||= CategoryDecorator.decorate_collection(categories)
  end
end
