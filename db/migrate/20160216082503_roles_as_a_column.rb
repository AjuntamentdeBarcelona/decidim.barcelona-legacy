class RolesAsAColumn < ActiveRecord::Migration
  def change
    add_column :users, :roles, :string, array: true, default: []
  end
end
