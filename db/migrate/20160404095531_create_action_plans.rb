class CreateActionPlans < ActiveRecord::Migration
  def change
    create_table :action_plans do |t|
      t.text :title, null: false
      t.text :description, null: false
      t.references :category, null: false
      t.references :subcategory, null: false
      t.timestamps null: false
    end
  end
end
