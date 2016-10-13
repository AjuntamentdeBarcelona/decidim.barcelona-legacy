class AddFeaturedToParticipatoryProcesses < ActiveRecord::Migration
  def change
    add_column :participatory_processes, :featured, :boolean, default: false
  end
end
