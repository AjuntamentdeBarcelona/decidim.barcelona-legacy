class PreventNullDatetimeInDebates < ActiveRecord::Migration
  def change
    Debate.with_hidden.update_all('starts_at = created_at, ends_at = created_at')
    change_column :debates, :starts_at, :datetime, null: false
    change_column :debates, :ends_at, :datetime, null: false
  end
end
