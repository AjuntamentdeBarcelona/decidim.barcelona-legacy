class CategoriesController < ApplicationController
  skip_authorization_check

  def index
    categories = Category.includes(:subcategories)
    @categories ||= CategoryDecorator.decorate_collection(categories)
  end
end
