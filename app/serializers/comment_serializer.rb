class CommentSerializer < ActiveModel::Serializer
  attributes :id, :commentable_id, :commentable_type, :body, :user_id, :author_name, :ancestry,
    :created_at, :alignment, :total_votes, :total_likes, :total_dislikes

  def author_name
    object.author.name
  end
end
