class ProposalSerializer < ActiveModel::Serializer
  include Concerns::ParticipatoryProcessSerializerUrl

  attributes :id, :title, :url, :summary, :created_at, :scope_, :district, :source,
             :total_votes, :voted, :votable, :official, :from_meeting,
             :editable, :conflictive?, :external_url, :hidden?, :can_hide, :can_hide_author,
             :flagged, :code, :arguable?, :permissions, :total_positive_comments,
             :total_negative_comments, :total_neutral_comments, :total_comments,
             :social_media_image_url, :author_id, :status, :closed

  has_one :category
  has_one :subcategory
  has_one :author

  # Name collision with serialization `scope`
  def scope_
    object.scope
  end

  def total_comments
    object.comments.length
  end

  def author
    object.author unless object.from_meeting
  end

  def author_id
    author.try(:id)
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
    scope && scope.current_user && object.votes_for.where(voter_type: "User", voter_id: scope.current_user.id, vote_flag: true).any?
  end

  def votable
    scope && scope.current_user && scope.current_user.level_two_or_three_verified?
  end

  def closed
    return false unless serialization_options[:step_id].present?
    step = object.participatory_process.steps.where(id: serialization_options[:step_id]).first
    step.feature_enabled?(:proposals_readonly) || !step.feature_enabled?(:enable_proposal_votes)
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
    scope && scope.current_user && object.flags.detect do |flag| 
      flag.user_id == scope.current_user.id
    end.present?
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

  def status
    answer.try(:status)
  end

  def answer
    object.answer if scope.can?(:read, ProposalAnswer)
  end

  def permissions
    {
      comment: scope && scope.can?(:comment, object),
      comment_as_moderator: scope && scope.can?(:comment_as_moderator, object),
      comment_as_administrator: scope && scope.can?(:comment_as_administrator, object)
    }
  end

  def feature_name
    "proposals"
  end
end
