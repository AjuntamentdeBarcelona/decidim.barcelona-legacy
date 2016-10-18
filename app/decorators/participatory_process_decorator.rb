class ParticipatoryProcessDecorator < ApplicationDecorator
  delegate_all

  translates :title, :subtitle, :summary, :description

  decorates_association :steps

  def scope
    if object.scope == "city"
      h.t("scopes.city")
    elsif object.district
      District.find(object.district).name
    end
  end

  def full_image_url
    return object.full_image.url if object.full_image.present?
    h.asset_url('demo-info-page.jpg')
  end

  def banner_image_url
    return object.banner_image.url if object.banner_image.present?
    h.asset_url('barcelona-hero.jpg')
  end
end
