class AddPublishedToParticipatoryProcesses < ActiveRecord::Migration
  def change
    add_column :participatory_processes, :published, :boolean, default: false
  end
end
