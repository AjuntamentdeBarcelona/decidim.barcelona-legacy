class CreateActionPlanStatistics < ActiveRecord::Migration
  def change
    create_table :action_plan_statistics do |t|
      t.integer :action_plan_id
      t.integer :related_proposals_count, default: 0
      t.integer :supports_count, default: 0
      t.integer :comments_count, default: 0
      t.integer :participants_count, default: 0
      t.integer :meeting_interventions_count, default: 0
      t.integer :interventions_count, default: 0

      t.timestamps null: false
    end
  end
end
