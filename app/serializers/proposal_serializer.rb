class ProposalSerializer < ActiveModel::Serializer
  attributes :id, :title, :url, :summary, :created_at, :scope_, :district, :source,
             :total_votes, :voted, :votable, :closed, :official, :from_meeting,
             :editable, :conflictive?, :external_url, :hidden?, :can_hide, :can_hide_author,
             :flagged, :code, :arguable?, :permissions, :total_positive_comments,
             :total_negative_comments, :total_neutral_comments, :total_comments,
             :social_media_image_url, :author_id
  
  has_one :category
  has_one :subcategory

  # Name collision with serialization `scope`
  def scope_
    object.scope
  end

  def total_comments
    object.comments.length
  end

  def total_positive_comments
    object.comments.select { |c| c.alignment && c.alignment > 0 }.count
  end

  def total_negative_comments
    object.comments.select { |c| c.alignment && c.alignment < 0 }.count
  end

  def total_neutral_comments
    object.comments.select { |c| c.alignment && c.alignment == 0 }.count
  end

  def voted
    object.votes_for.detect do |v| 
      v.voter_type == 'User' && v.voter_id == scope.current_user.id && v.vote_flag
    end.present?
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
    scope && object.flags.detect { |flag| flag.user_id == scope.current_user.id }.present?
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

  def social_media_image_url
    scope && scope.asset_url('social-media-icon.png')
  end

  def permissions
    {
      comment: scope && scope.can?(:comment, object),
      comment_as_moderator: scope && scope.can?(:comment_as_moderator, object),
      comment_as_administrator: scope && scope.can?(:comment_as_administrator, object)
    }
  end
end
