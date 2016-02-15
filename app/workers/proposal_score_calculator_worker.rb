class ProposalScoreCalculatorWorker
  include Sidekiq::Worker

  def perform(proposal_id)
    proposal = Proposal.with_hidden.find(proposal_id)

    hot_score = ScoreCalculator.hot_score(proposal.created_at,
                                          proposal.total_votes,
                                          proposal.total_votes,
                                          proposal.comments_count)

    confidence_score = ScoreCalculator.confidence_score(proposal.total_votes,
                                                        proposal.total_votes)

    proposal.update_columns(
      hot_score: hot_score,
      confidence_score: confidence_score
    )
  end
end
