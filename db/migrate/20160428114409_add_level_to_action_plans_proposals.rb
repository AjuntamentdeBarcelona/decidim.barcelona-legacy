class AddLevelToActionPlansProposals < ActiveRecord::Migration
  def change
    change_table :action_plans_proposals do |t| 
      t.integer :level, default: nil
    end
  end
end
