module ProposalsSelectorHelper
  def proposals_selector(options = {})
    react_component(
      'ProposalsSelector',
      proposals_api_url: api_proposals_url(format: :json),
      resource_name: options[:resource_name],
      proposals: serialized_proposals_for_selector(options[:proposals])
    )
  end

  def serialized_proposals_for_selector(proposals)
    proposals.map do |proposal|
      {
        id: proposal.id,
        title: proposal.title,
        summary: proposal.summary,
        source: proposal.source,
        total_votes: proposal.total_votes,
        total_comments: proposal.comments.count
      }
    end
  end
end
