class CreateProposalAnswers < ActiveRecord::Migration
  def change
    create_table :proposal_answers do |t|
      t.integer :proposal_id, null: false
      t.text :message
      t.string :status, null: false

      t.timestamps null: false
    end
  end
end
