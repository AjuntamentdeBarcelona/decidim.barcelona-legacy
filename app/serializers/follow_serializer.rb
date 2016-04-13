class FollowSerializer < ActiveModel::Serializer
  attributes :id, :follower_id, :following_id, :following_type
end
