module ComponentsHelper
  def react_app(name, props = {}) 
    props.merge!({
      session: {
        signed_in: user_signed_in?,
        user: {
          id: current_user && current_user.id
        },
        is_organization: current_user && current_user.organization?,
        is_reviewer: current_user && current_user.reviewer?,
        can_create_new_proposals: can?(:create, Proposal),
        can_create_action_plan: can?(:create, ActionPlan)
      },
      participatory_process_id: @participatory_process_id
    })
    react_component("#{name}App", props)
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
