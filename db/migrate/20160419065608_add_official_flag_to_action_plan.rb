class AddOfficialFlagToActionPlan < ActiveRecord::Migration
  def change
    add_column :action_plans, :official, :boolean, default: false, null: false
    add_column :action_plans, :approved, :boolean, default: false, null: false
  end
end
