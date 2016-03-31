module ComponentsHelper
  def react_app(name) 
    react_component("#{name}App", session: {
      signed_in: user_signed_in?,
      is_organization: current_user && current_user.organization?
    })
  end

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
    resource_name = resource.class.name.downcase

    react_component(
      'AutocompleteInputAddress',
      addressInputName: "#{resource_name}[address]",
      address: resource.address,
      latitudeInputName: "#{resource_name}[address_latitude]",
      latitude: resource.address_latitude,
      longitudeInputName: "#{resource_name}[address_longitude]",
      longitude: resource.address_longitude
    ) 
  end
end
