module IconsHelper
  def bcn_icon(name)
    content_tag :span, "", class: "bcn-icon-#{name}"
  end
end
