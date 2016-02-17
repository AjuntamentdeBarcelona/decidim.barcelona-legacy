class AddInterventionsToMeetings < ActiveRecord::Migration
  def change
    change_table :meetings do |t|
      t.integer :interventions
    end
  end
end
