class AddStartAndEndTimeToDebates < ActiveRecord::Migration
  def change
    change_table :debates do |t|
      t.datetime :starts_at
      t.datetime :ends_at
    end
  end
end
