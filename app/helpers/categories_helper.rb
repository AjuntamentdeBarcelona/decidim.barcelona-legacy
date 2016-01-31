module CategoriesHelper
  def category_icon(category)
    content_tag :i, "", class: "category-icon category-icon-#{category.id}"
  end
end
