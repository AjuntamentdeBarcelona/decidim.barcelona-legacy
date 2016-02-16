module ProposalFiltersHelper
  def proposal_filters(options = {})
    react_component(
      'ProposalFilters', 
      filter: options[:filter],
      filterUrl: proposals_url,
      districts: District.all.map{ |district| [district.name, district.id.to_s] },
      categories: serialized_categories,
      subcategories: serialized_subcategories,
      tagCloud: options[:tag_cloud],
      tagsEnabled: feature?(:proposal_tags)
    ) 
  end
end
