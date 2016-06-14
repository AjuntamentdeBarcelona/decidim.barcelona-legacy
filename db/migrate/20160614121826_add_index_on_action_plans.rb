class AddIndexOnActionPlans < ActiveRecord::Migration
  def change
    add_index :action_plans_proposals, :proposal_id
    add_index :action_plans_proposals, :action_plan_id
  end
end
