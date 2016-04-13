class AddPgSearchFieldsToActionPlans < ActiveRecord::Migration
  def change
    add_column :action_plans, :tsv, :tsvector
    add_index :action_plans, :tsv, using: "gin"
  end
end
