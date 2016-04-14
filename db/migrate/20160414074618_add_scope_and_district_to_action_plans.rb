class AddScopeAndDistrictToActionPlans < ActiveRecord::Migration
  def change
    add_column :action_plans, :scope, :string, default: 'city'
    add_column :action_plans, :district, :integer, default: 1
  end
end
