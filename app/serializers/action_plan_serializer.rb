class ActionPlanSerializer < ActiveModel::Serializer
  attributes :id, :title, :url

  def url
    edit_revision_action_plan_path(object)
  end
end
