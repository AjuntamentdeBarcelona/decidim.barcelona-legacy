class AddOfficialFieldToAnswers < ActiveRecord::Migration
  def change
    add_column :proposal_answers, :official, :boolean
  end
end
