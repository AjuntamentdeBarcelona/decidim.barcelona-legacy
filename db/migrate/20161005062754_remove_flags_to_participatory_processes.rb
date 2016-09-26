class RemoveFlagsToParticipatoryProcesses < ActiveRecord::Migration
  def change
    remove_column :participatory_processes, :flags
  end
end
