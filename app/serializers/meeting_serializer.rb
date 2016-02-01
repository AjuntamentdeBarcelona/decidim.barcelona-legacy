class MeetingSerializer < ActiveModel::Serializer
  attributes :id, :slug, :title, :description, :address, :address_latitude, :address_longitude, :held_at, :start_at, :end_at

  def held_at
    I18n.l(object.held_at)
  end

  def start_at
    object.start_at.present? ? I18n.l(object.start_at) : nil
  end

  def end_at
    object.end_at.present? ? I18n.l(object.end_at) : nil
  end
end
