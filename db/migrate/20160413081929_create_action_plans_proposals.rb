class CreateActionPlansProposals < ActiveRecord::Migration
  def change
    create_table :action_plans_proposals, id: false do |t|
      t.integer :action_plan_id
      t.integer :proposal_id
    end
  end
end
