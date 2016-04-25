class CommentSerializer < ActiveModel::Serializer
  attributes :id, :commentable_id, :commentable_type, :body, :user_id, :author_name, :ancestry,
    :created_at

  def author_name
    object.author.name
  end
end
