class Recommender
  def initialize(user)
    @user = user
  end

  def proposals
    @proposals ||= @user.recommended_proposals.order("recommendations.score / (proposals.cached_votes_up + 1) desc")
  end
end
