class PreventNullDatetimeInDebates < ActiveRecord::Migration
  def change
    change_column :debates, :starts_at, :datetime, null: false
    change_column :debates, :ends_at, :datetime, null: false
  end
end
