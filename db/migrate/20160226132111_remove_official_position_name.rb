class RemoveOfficialPositionName < ActiveRecord::Migration
  def change
    remove_column :users, :official_position
  end
end
