class AddParticipatoryStructureToProcesses < ActiveRecord::Migration
  def change
    change_table :participatory_processes do |t|
      t.text :participatory_structure
    end
  end
end
