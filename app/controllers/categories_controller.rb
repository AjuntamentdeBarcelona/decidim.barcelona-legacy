class CategoriesController < ApplicationController
  skip_authorization_check

  def index
    categories = Category.includes(:subcategories)
    @last_modified = [Category.maximum(:updated_at), Subcategory.maximum(:updated_at)].max
    @categories ||= CategoryDecorator.decorate_collection(categories)
  end
end
