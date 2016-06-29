class AddCommentsCountToActionPlans < ActiveRecord::Migration
  def change
    add_column :action_plans, :comments_count, :integer, default: 0
  end
end
