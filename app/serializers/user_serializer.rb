class UserSerializer < ActiveModel::Serializer
  attributes :id, :hidden?, :erased?, :name, :official?, :official_level, 
    :verified_organization?, :role, :avatar_image

  def role
    return 'administrator' if object.administrator?
    return 'moderator'     if object.moderator?
    return 'organization'  if object.organization?
  end

  def avatar_image
    if object.administrator?
      scope && scope.image_url("admin_avatar.png")
    elsif object.moderator?
      scope && scope.image_url("moderator_avatar.png")
    elsif object.organization?
      scope && scope.image_url("collective_avatar.png")
    end
  end
end
