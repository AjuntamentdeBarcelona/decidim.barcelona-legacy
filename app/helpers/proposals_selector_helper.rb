module ProposalsSelectorHelper
  def proposals_selector(options = {})
    react_component(
      'ProposalsSelector',
      proposals_api_url: api_proposals_url(format: :json),
      resource_name: options[:resource_name],
      proposals: options[:proposals]
    )
  end
end
