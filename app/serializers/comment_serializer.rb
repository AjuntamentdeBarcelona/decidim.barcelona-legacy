class CommentSerializer < ActiveModel::Serializer
  attributes :id, :commentable_id, :commentable_type, :body, :ancestry,
    :created_at, :alignment, :total_votes, :total_likes, :total_dislikes,
    :as

  has_one :author

  def as
    return 'administrator' if object.as_administrator?
    return 'moderator'     if object.as_moderator?
  end
end
