class CommentSerializer < ActiveModel::Serializer
  attributes :id, :commentable_id, :commentable_type, :body, :ancestry, :created_at, 
    :alignment, :total_votes, :total_likes, :total_dislikes, :as, :flagged, :permissions,
    :moderator_id, :administrator_id

  has_one :author

  def created_at
    I18n.l object.created_at.to_datetime, format: :datetime
  end

  def as
    return 'administrator' if object.as_administrator?
    return 'moderator'     if object.as_moderator?
    return 'organization'  if object.author.organization?
  end

  def body
    scope && scope.simple_format(scope.text_with_links(object.body))
  end

  def flagged
    scope && Flag.flagged?(scope.current_user, object)
  end

  def permissions
    {
      vote: scope && scope.can?(:vote, object)
    }
  end
end
