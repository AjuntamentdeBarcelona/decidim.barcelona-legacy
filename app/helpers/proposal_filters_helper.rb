module ProposalFiltersHelper
  def proposal_filters(options = {})
    react_component(
      'ProposalFilters', 
      filter: options[:filter],
      filterUrl: proposals_url,
      districts: Proposal::DISTRICTS,
      categories: serialized_categories,
      subcategories: serialized_subcategories,
      tagsEnabled: feature?(:proposal_tags)
    ) 
  end
end
