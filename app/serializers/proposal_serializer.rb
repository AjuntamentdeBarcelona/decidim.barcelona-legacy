class ProposalSerializer < ActiveModel::Serializer
  attributes :id, :title, :url, :summary, :created_at, :scope_, :district, :source, :total_votes, :total_comments, :voted

  has_one :category
  has_one :subcategory

  # Name collision with serialization `scope`
  def scope_
    object.scope
  end

  def author_name
    unless object.official? || object.from_meeting?
      object.author.name
    end
  end

  def total_comments
    object.comments.count
  end

  def voted
    scope && scope.current_user && scope.current_user.voted_up_on?(object)
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
