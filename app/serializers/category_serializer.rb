class CategorySerializer < ActiveModel::Serializer
  attributes :id, :name

  has_many :subcategories

  def name
    object.name[I18n.locale.to_s]
  end
end
