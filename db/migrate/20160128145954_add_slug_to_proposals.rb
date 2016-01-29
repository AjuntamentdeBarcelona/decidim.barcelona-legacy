class AddSlugToProposals < ActiveRecord::Migration
  def change
    add_column :proposals, :slug, :string
    add_index :proposals, :slug, unique: true
  end
end
