class AddParticipatoryProcessRefToActionPlans < ActiveRecord::Migration
  def change
    add_reference :action_plans, :participatory_process, index: true, foreign_key: true
  end
end
