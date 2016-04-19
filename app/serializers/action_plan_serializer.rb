class ActionPlanSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :created_at, :url, :scope_, :district,
    :edit_url, :new_revision_url, :approved

  has_one :category
  has_one :subcategory

  # Name collision with serialization `scope`
  def scope_
    object.scope
  end

  def url
    action_plan_path(object)
  end

  def edit_url
    edit_revision_action_plan_path(object)
  end

  def new_revision_url
    new_revision_action_plan_revision_path(object)
  end

  def created_at
    I18n.l object.created_at.to_date
  end

  def district
    District.find(object.district)
  end
end
