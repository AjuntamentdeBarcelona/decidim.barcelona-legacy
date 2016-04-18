class ActionPlanSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :created_at, :url, :scope_, :district

  has_one :category
  has_one :subcategory

  # Name collision with serialization `scope`
  def scope_
    object.scope
  end

  def url
    action_plan_path(object)
  end

  def created_at
    I18n.l object.created_at.to_date
  end

  def district
    District.find(object.district)
  end
end
