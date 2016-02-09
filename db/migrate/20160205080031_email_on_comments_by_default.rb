class EmailOnCommentsByDefault < ActiveRecord::Migration
  def change
    add_column :users, :notifications_by_default, :boolean, default: false
  end
end
