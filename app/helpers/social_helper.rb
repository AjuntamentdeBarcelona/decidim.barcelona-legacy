module SocialHelper
  def share_button_for(proposal)
    content_tag :div, class: 'share-buttons' do
      result = social_share_button_tag("#{proposal.title} #DecidimBarcelona",
                              url: proposal_url(proposal))
      result << content_tag(
        :a,
        class: "whatsapp-share",
        href: "whatsapp://send?text=#{proposal.title} #{proposal_url(proposal)}",
        "data-action" => "share/whatsapp/share"
      ) do
        content_tag :i, "", class: 'fa fa-whatsapp'
      end
    end
  end
end
