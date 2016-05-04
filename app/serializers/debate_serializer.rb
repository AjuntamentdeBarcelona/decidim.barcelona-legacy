class DebateSerializer < ActiveModel::Serializer
  attributes :id, :total_comments, :permissions

  has_one :author

  def total_comments
    object.comments.count
  end

  def permissions
    {
      comment: scope && scope.can?(:comment, object),
      comment_as_moderator: scope && scope.can?(:comment_as_moderator, object),
      comment_as_administrator: scope && scope.can?(:comment_as_administrator, object)
    }
  end
end
