class AddConfirmedHideAtToParticipatoryProcesses < ActiveRecord::Migration
  def change
    add_column :participatory_processes, :confirmed_hide_at, :datetime
  end
end
