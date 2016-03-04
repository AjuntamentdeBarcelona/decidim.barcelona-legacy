class AddPictureToDebates < ActiveRecord::Migration
  def change
    add_column :debates, :picture, :string
  end
end
