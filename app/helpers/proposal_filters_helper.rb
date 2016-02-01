module ProposalFiltersHelper
  def proposal_filters(options = {})
    react_component(
      'ProposalFilters', 
      filter: serialized_filters(options[:filter]),
      filterUrl: proposals_url,
      districts: Proposal::DISTRICTS,
      categories: serialized_categories,
      subcategories: serialized_subcategories,
      tagsEnabled: feature?(:proposal_tags)
    ) 
  end

  def serialized_filters(filters)
    {
      search_filter: filters.search_filter,
      tag_filter: filters.tag_filter,
      params: filters.params,
      tag_cloud: filters.tag_cloud
    }
  end
end
