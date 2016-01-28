class AddSlugToMeetings < ActiveRecord::Migration
  def change
    add_column :meetings, :slug, :string
    add_index :meetings, :slug, unique: true
  end
end
