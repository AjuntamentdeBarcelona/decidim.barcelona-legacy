module IconsHelper
  def bcn_icon(name)
    content_tag :span, "", class: "bcn-icon-#{name} bcn-icon"
  end

  def icon(name, options = {})
    html_properties = {}

    html_properties["width"] = options[:width]
    html_properties["height"] = options[:height]
    html_properties["aria-label"] = options[:aria_label]
    html_properties["role"] = options[:role]
    html_properties["aria-hidden"] = options[:aria_hidden]
    html_properties["class"] = "icon icon--#{name} #{options[:class]}"

    content_tag :svg, html_properties do
      content_tag :use, nil, "xlink:href" => "#{asset_url("decidim-icons.svg")}#icon-#{name}"
    end
  end
end
