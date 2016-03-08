class CopyProposalsSummaryToDescription < ActiveRecord::Migration
  def up
    Proposal.transaction do
      execute "UPDATE proposals SET description=summary"
    end
  end
end
