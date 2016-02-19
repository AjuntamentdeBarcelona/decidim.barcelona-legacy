class AddMissingIndexesV2 < ActiveRecord::Migration
  def change
    add_index :subcategories, :category_id
    add_index :categories, :position
  end
end
