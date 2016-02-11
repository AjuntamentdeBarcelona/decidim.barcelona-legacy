# Compute the proposal's weight for a given user. This class should be used
# to compute the preferences matrix for the recommendations engine.
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

  # Public
  #
  # Compute the proposal's weight for a given user
  #
  # user_id - id of the user to compute the proposal's weight for
  def weight_for(user_id)
    weight = 0

    weight += @weights[:created] if @proposal.author_id == user_id
    weight += @weights[:voted] if proposal_voters.include?(user_id)
    weight += @weights[:positive_comment] if proposal_positive_comments[user_id].present?
    weight += @weights[:negative_comment] if proposal_negative_comments[user_id].present?

    weight
  end

  private

  # Private
  #
  # Fetch ids for the users who voted this proposal
  def proposal_voters
    @proposal_voters ||= Vote.where(votable_id: @proposal.id, votable_type: 'Proposal', voter_type: 'User').pluck(:voter_id)
  end

  # Private
  #
  # Fetch ids for the users who have at least a positive comment on it
  def proposal_positive_comments
    @proposal_positive_comments ||= @proposal.comments.group(:user_id).where(alignment: 1).count
  end

  # Private
  #
  # Fetch ids for the users who have at least a negative comment on it
  def proposal_negative_comments
    @proposal_positive_comments ||= @proposal.comments.group(:user_id).where(alignment: -1).count
  end
end
