class AddHiddenAtToParticipatoryProcesses < ActiveRecord::Migration
  def change
    add_column :participatory_processes, :hidden_at, :datetime
  end
end
