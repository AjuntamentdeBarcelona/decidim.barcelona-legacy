class AddIndexOnComments < ActiveRecord::Migration
  def change
    add_index :comments, :commentable_id
    add_index :comments, :commentable_type
  end
end
