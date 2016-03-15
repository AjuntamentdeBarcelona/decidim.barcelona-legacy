class AddStartAndEndTimeToDebates < ActiveRecord::Migration
  def change
    change_table :debates do |t|
      t.datetime :starts_at
      t.datetime :ends_at
    end

    Debate.update_all('starts_at = created_at, ends_at = created_at')
  end
end
