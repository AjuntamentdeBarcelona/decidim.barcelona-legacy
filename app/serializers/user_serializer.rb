class UserSerializer < ActiveModel::Serializer
  attributes :id, :hidden, :erased, :name, :official_level, :verified_organization

  def hidden
    object.hidden?
  end

  def erased
    object.erased?
  end

  def verified_organization
    object.verified_organization?
  end
end
