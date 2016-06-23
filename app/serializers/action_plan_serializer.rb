class ActionPlanSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :created_at, :url, :scope_, :district,
    :edit_url, :new_revision_url, :approved, :weight, :social_media_image_url,
    :statistics, :permissions, :total_comments, :total_positive_comments,
    :total_negative_comments, :total_neutral_comments

  has_one :category
  has_one :subcategory

  # Name collision with serialization `scope`
  def scope_
    object.scope
  end

  def url
    action_plan_path(object, participatory_process_id: object.participatory_process)
  end

  def edit_url
    edit_action_plan_path(object, participatory_process_id: object.participatory_process)
  end

  def new_revision_url
    new_action_plan_revision_path(object, participatory_process_id: object.participatory_process)
  end

  def created_at
    I18n.l object.created_at.to_date
  end

  def district
    District.find(object.district)
  end

  def social_media_image_url
    scope && scope.asset_url('social-media-icon.png')
  end

  def total_comments
    object.comments.length
  end

  def total_positive_comments
    object.comments.select { |c| c.alignment && c.alignment > 0 }.count
  end

  def total_negative_comments
    object.comments.select { |c| c.alignment && c.alignment < 0 }.count
  end

  def total_neutral_comments
    object.comments.select { |c| c.alignment && c.alignment == 0 }.count
  end

  def permissions
    {
      comment: scope && scope.can?(:comment, object),
      comment_as_moderator: scope && scope.can?(:comment_as_moderator, object),
      comment_as_administrator: scope && scope.can?(:comment_as_administrator, object)
    }
  end
end
