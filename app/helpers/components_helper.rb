module ComponentsHelper
  def static_map(options={})
    react_component(
      'StaticMap',
      latitude: options[:latitude],
      longitude: options[:longitude],
      zoom: options[:zoom]
    )
  end

  def autocomplete_input_address(options = {})
    resource = options[:resource]
    table_name = resource.class.table_name

    react_component(
      'AutocompleteInputAddress',
      addressInputName: "#{table_name}[address]",
      address: resource.address,
      latitudeInputName: "#{table_name}[address_latitude]",
      latitude: resource.address_latitude,
      longitudeInputName: "#{table_name}[address_longitude]",
      longitude: resource.address_longitude
    ) 
  end

  def serialized_categories
    CategoryDecorator.decorate_collection(Category.all).map do |category|
      {
        id: category.id.to_s,
        name: category.name,
        description: category.description
      }
    end
  end

  def serialized_subcategories
    SubcategoryDecorator.decorate_collection(Subcategory.all).map do |subcategory|
      {
        id: subcategory.id.to_s,
        name: subcategory.name,
        description: subcategory.description,
        categoryId: subcategory.category_id.to_s
      }
    end
  end
end
