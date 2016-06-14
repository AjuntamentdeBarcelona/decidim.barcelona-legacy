class AddIndexesOnProposalAnswers < ActiveRecord::Migration
  def change
    add_index :proposal_answers, :status
  end
end
