module ProposalsHelper
  def namespaced_proposal_path(proposal, options={})
    @namespace_proposal_path ||= namespace
    case @namespace_proposal_path
    when "management"
      management_proposal_path(proposal, options)
    else
      proposal_path(proposal, options)
    end
  end

  def proposal_class_names(proposal)
    proposal.official? ? 'official' : ''
  end

  def proposal_badge(proposal)
    content_tag :span, nil, class: "proposal-badge #{proposal.source}-badge"
  end
end
