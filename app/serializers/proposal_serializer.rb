class ProposalSerializer < ActiveModel::Serializer
  attributes :id, :title, :url, :summary, :created_at, :scope, :district, :source

  has_one :category
  has_one :subcategory

  def scope
    object.scope
  end

  def author_name
    unless object.official? || object.from_meeting?
      object.author.name
    end
  end

  def votes
    object.total_votes
  end

  def url
    proposal_path(object)
  end

  def created_at
    I18n.l object.created_at.to_date
  end

  def district
    District.find(object.district)
  end
end
