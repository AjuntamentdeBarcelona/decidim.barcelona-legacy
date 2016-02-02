module SocialHelper
  def share_button_for(proposal)
    social_share_button_tag("#{proposal.title} #DecidimBarcelona", url: proposal_url(proposal))
  end
end
