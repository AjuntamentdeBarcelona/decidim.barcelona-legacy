class MeetingSerializer < ActiveModel::Serializer
  attributes :id, :slug, :title, :description, :address, :address_latitude, :url,
             :address_longitude, :held_at, :start_at, :end_at, :category,
             :subcategory, :closed, :district, :address_details, :organizations,
             :close_report


  def held_at
    I18n.l(object.held_at)
  end

  def district
    return unless object.district
    @district ||= { id: object.district, name: District.find(object.district).name }
  end

  def closed
    object.closed?
  end

  def start_at
    object.start_at.present? ? I18n.l(object.start_at) : nil
  end

  def closed_at
    object.closed_at.present? ? I18n.l(object.closed_at) : nil
  end

  def end_at
    object.end_at.present? ? I18n.l(object.end_at) : nil
  end

  def category
    {
      id: object.category.id,
      name: object.category.decorate.name
    }
  end

  def subcategory
    {
      id: object.subcategory.id,
      name: object.subcategory.decorate.name
    }
  end

  def url
    meeting_path(object)
  end
end
