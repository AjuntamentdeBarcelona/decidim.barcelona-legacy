class AddSlugToDebates < ActiveRecord::Migration
  def change
    add_column :debates, :slug, :string
    add_index :debates, :slug, unique: true
  end
end
