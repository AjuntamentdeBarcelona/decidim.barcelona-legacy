class FlagsAsColumn < ActiveRecord::Migration
  def change
    add_column :participatory_processes, :flags, :string, array: true, default: []
  end
end
