class SubcategorySerializer < ActiveModel::Serializer
  attributes :id, :name, :category_id, :position

  def name
    object.name[I18n.locale.to_s]
  end
end
