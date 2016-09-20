class AddMoreFieldsToParticipatoryProcesses < ActiveRecord::Migration
  def change
    add_column :participatory_processes, :admin_name, :string
    add_column :participatory_processes, :admin_email, :string
    add_column :participatory_processes, :title, :text
    add_column :participatory_processes, :subtitle, :text
    add_column :participatory_processes, :scope, :string, default: "city"
    add_column :participatory_processes, :district, :integer, default: 1
    add_column :participatory_processes, :manager_group, :string
    add_column :participatory_processes, :areas, :string
    add_column :participatory_processes, :summary, :text
    add_column :participatory_processes, :description, :text
    add_column :participatory_processes, :audience, :text
    add_column :participatory_processes, :citizenship_scope, :text
  end
end
