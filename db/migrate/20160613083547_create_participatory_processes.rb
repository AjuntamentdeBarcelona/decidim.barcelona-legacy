class CreateParticipatoryProcesses < ActiveRecord::Migration
  def change
    create_table :participatory_processes do |t|
      t.string :name
      t.string :slug

      t.timestamps null: false
    end
  end
end
