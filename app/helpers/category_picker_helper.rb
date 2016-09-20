module CategoryPickerHelper
  def category_picker(record, options = {})
    react_component(
      'CategoryPicker',
      categoryInputName: options.fetch(:axis_name, "#{record.class.name.underscore}[category_id]"),
      subcategoryInputName: options.fetch(:action__line_name, "#{record.class.name.underscore}[subcategory_id]"),
      categories: serialized_categories,
      subcategories: serialized_subcategories,
      selectedCategoryId: record.category_id.to_s,
      selectedSubcategoryId: record.subcategory_id.to_s
    )
  end

  def serialized_categories
    CategoryDecorator.decorate_collection(Category.where(participatory_process_id: @participatory_process.id).all).map do |category|
      {
        id: category.id.to_s,
        name: category.name
      }
    end
  end

  def serialized_subcategories
    SubcategoryDecorator.decorate_collection(Subcategory.where(participatory_process_id: @participatory_process.id).all).map do |subcategory|
      {
        id: subcategory.id.to_s,
        name: subcategory.name,
        categoryId: subcategory.category_id.to_s
      }
    end
  end
end
