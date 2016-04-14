class RemoveTitleAndDescriptionFromActionPlans < ActiveRecord::Migration
  def change
    remove_column :action_plans, :title, :text
    remove_column :action_plans, :description, :text
  end
end
