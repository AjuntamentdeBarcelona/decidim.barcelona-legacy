class UserSerializer < ActiveModel::Serializer
  attributes :id, :hidden?, :erased?, :name, :official?, :official_level, 
    :verified_organization?, :role, :avatar_image

  def role
    return 'administrator' if object.administrator?
    return 'moderator'     if object.moderator?
    return 'organization'  if object.organization?
  end

  def avatar_image
    scope.image_url("avatar.png")
  end
end
