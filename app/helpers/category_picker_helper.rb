module CategoryPickerHelper
  def category_picker(record, options = {})
    react_component(
      'CategoryPicker',
      categoryInputName: options.fetch(:axis_name, "#{record.class.name.underscore}[category_id]"),
      subcategoryInputName: options.fetch(:action__line_name, "#{record.class.name.underscore}[subcategory_id]"),
      categories: serialized_categories(options),
      subcategories: serialized_subcategories(options),
      selectedCategoryId: record.category_id.to_s,
      selectedSubcategoryId: record.subcategory_id.to_s,
      participatoryProcessId: options[:participatory_process_slug]
    )
  end

  def serialized_categories(options = {})
    CategoryDecorator.decorate_collection(Category.where(participatory_process_id: options[:participatory_process_id]).all).map do |category|
      {
        id: category.id.to_s,
        name: category.name
      }
    end
  end

  def serialized_subcategories(options = {})
    SubcategoryDecorator.decorate_collection(Subcategory.where(participatory_process_id: options[:participatory_process_id]).all).map do |subcategory|
      {
        id: subcategory.id.to_s,
        name: subcategory.name,
        categoryId: subcategory.category_id.to_s
      }
    end
  end
end
