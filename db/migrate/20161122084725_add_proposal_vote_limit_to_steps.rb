class AddProposalVoteLimitToSteps < ActiveRecord::Migration
  def change
    add_column :steps, :proposal_vote_limit, :integer, default: 0
  end
end
