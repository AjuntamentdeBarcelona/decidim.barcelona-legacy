class AddIndexOnProposalAnswers < ActiveRecord::Migration
  def change
    add_index :proposal_answers, :proposal_id
  end
end
