module IconsHelper
  def bcn_icon(name)
    content_tag :span, "", class: "bcn-icon-#{name} bcn-icon"
  end
end
