class Recommendations::ProposalScale
  DEFAULT_CREATED_WEIGHT = 10
  DEFAULT_VOTED_WEIGHT = 2
  DEFAULT_NEGATIVE_COMMENT_WEIGHT = -1
  DEFAULT_POSITIVE_COMMENT_WEIGHT = 1

  attr_reader :object_id, :weights

  def initialize(proposal, weights={})
    @proposal = proposal
    @weights = weights
    @object_id = @proposal.id

    @weights[:created] ||= DEFAULT_CREATED_WEIGHT
    @weights[:voted] ||= DEFAULT_VOTED_WEIGHT
    @weights[:positive_comment] ||= DEFAULT_POSITIVE_COMMENT_WEIGHT
    @weights[:negative_comment] ||= DEFAULT_NEGATIVE_COMMENT_WEIGHT
  end

  def weight_for(user_id)
    weight = 0

    weight += @weights[:created] if @proposal.author_id == user_id
    weight += @weights[:voted] if proposal_voters.include?(user_id)
    weight += @weights[:positive_comment] if proposal_positive_comments[user_id].present?
    weight += @weights[:negative_comment] if proposal_negative_comments[user_id].present?

    weight
  end

  private

  def proposal_voters
    @proposal_voters ||= Vote.where(votable_id: @proposal.id, votable_type: 'Proposal', voter_type: 'User').pluck(:voter_id)
  end

  def proposal_positive_comments
    @proposal_positive_comments ||= @proposal.comments.group(:user_id).where(alignment: 1).count
  end

  def proposal_negative_comments
    @proposal_positive_comments ||= @proposal.comments.group(:user_id).where(alignment: -1).count
  end
end
