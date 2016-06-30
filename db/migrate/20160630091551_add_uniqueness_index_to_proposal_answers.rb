class AddUniquenessIndexToProposalAnswers < ActiveRecord::Migration
  def change
    remove_index :proposal_answers, :proposal_id
    add_index :proposal_answers, :proposal_id, unique: true
  end
end
