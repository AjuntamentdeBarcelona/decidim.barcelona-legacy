class CreateActionPlanReports < ActiveRecord::Migration
  def change
    create_table :action_plan_reports do |t|
      t.string :file
      t.boolean :pending, default: true, null: false

      t.timestamps null: false
    end
  end
end
