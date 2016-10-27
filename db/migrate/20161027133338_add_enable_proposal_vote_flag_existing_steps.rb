class AddEnableProposalVoteFlagExistingSteps < ActiveRecord::Migration
  def change
    Step.find_each do |step|
      step.flags << "enable_proposal_votes"
      step.save
    end
  end
end
