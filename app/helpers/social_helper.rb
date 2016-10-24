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

  def share_component_for(model, options={})
    react_component("SocialShareButtons",
                    title: model.title,
                    url: model.url,
                    decidimIconsUrl: asset_url("decidim-icons.svg"),
                    modalId: options[:modal_id] || "share",
                    linkText: options[:text] || "Share",
                    linkClassName: options[:class_name]
    )
  end
end
