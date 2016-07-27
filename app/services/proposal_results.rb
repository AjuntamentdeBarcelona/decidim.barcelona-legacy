class ProposalResults
  def initialize(user)
    @user = user
  end

  def any?
    authored_proposals.any? || followed_proposals.any?
  end

  def interacted?
    any? ||
      @user.comments.where(commentable_type: "Proposal").any? ||
      @user.votes.where(votable_type: "Proposal").any?
  end

  def authored_proposals
    @authored_proposals ||= @user.proposals.where(
      id: ProposalAnswer.select(:proposal_id)
    ).order(Proposal.arel_table[:cached_votes_up].desc)
  end

  def followed_proposals
    @followed_proposals ||= Proposal.where(
      id: Follow.where({ follower: @user,
                         following_type: 'Proposal'
                       }).select(:following_id)
    ).where(
      id: ProposalAnswer.select(:proposal_id)
    ).where.not(id: authored_proposals).order(
      Proposal.arel_table[:cached_votes_up].desc
    )
  end
end
