class ProposalSerializer < ActiveModel::Serializer
  attributes :id, :title, :url, :summary, :created_at, :scope_, :district,
             :source, :total_votes, :total_comments, :total_positive_comments,
             :total_negative_comments, :total_neutral_comments, :voted,
             :votable, :closed, :official, :from_meeting, :editable,
             :conflictive?, :external_url, :hidden?, :can_hide, :can_hide_author,
             :flagged, :code

  has_one :category
  has_one :subcategory
  has_one :author
  has_one :answer

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

  def total_positive_comments
    object.comments.positive.count
  end

  def total_negative_comments
    object.comments.negative.count
  end

  def total_neutral_comments
    object.comments.neutral.count
  end

  def voted
    scope && scope.current_user && scope.current_user.voted_up_on?(object)
  end

  def votable
    scope && scope.current_user && scope.current_user.level_two_or_three_verified?
  end

  def editable
    scope && scope.can?(:update , object)
  end

  def can_hide
    scope && scope.can?(:hide , object)
  end

  def can_hide_author
    scope && scope.can?(:hide , object.author)
  end

  def flagged
    scope && Flag.flagged?(scope.current_user, object)
  end

  def url
    scope && scope.proposal_url(object)
  end

  def created_at
    I18n.l object.created_at.to_date
  end

  def district
    District.find(object.district)
  end
end
