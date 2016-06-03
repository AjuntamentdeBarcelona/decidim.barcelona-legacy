class AddWeightColumn < ActiveRecord::Migration
  def change
    add_column :action_plans, :weight, :integer, null: false, default: 1
  end
end
