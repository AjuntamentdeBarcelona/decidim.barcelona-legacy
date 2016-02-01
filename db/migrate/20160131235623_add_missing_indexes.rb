class AddMissingIndexes < ActiveRecord::Migration
  def change
    add_index :proposals, :category_id
    add_index :proposals, :subcategory_id
    add_index :proposals, :official
    add_index :proposals, :created_at
  end
end
