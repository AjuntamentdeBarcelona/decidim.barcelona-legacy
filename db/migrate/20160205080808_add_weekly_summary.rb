class AddWeeklySummary < ActiveRecord::Migration
  def change
    add_column :users, :weekly_summary, :boolean, default: false
  end
end
