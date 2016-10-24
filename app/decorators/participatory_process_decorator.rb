class ParticipatoryProcessDecorator < ApplicationDecorator
  delegate_all

  translates :title, :subtitle, :summary, :description

  decorates_association :steps
  decorates_association :attachments
  decorates_association :categories
  decorates_association :active_step

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

  def documents
    attachments.sort_by(&:name).select do |attachment|
      attachment.type == :document
    end
  end

  def images
    attachments.sort_by(&:name).select do |attachment|
      attachment.type == :image
    end
  end

  def hashtag
    "##{object.hashtag}" if object.hashtag
  end

  def url
    h.participatory_process_url(object)
  end
end
