class MakeOfficialFalseByDefault < ActiveRecord::Migration
  def change
    change_column :proposal_answers, :official, :boolean, :default => false, null: false
  end
end
