class CreateActionPlanRevisions < ActiveRecord::Migration
  def change
    create_table :action_plan_revisions do |t|
      t.integer :action_plan_id
      t.integer :author_id
      t.text :title
      t.text :description
      t.tsvector :tsv

      t.timestamps
    end

    add_index :action_plan_revisions, :tsv, using: "gin"
  end
end
