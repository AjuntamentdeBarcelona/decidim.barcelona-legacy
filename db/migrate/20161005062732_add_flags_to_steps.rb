class AddFlagsToSteps < ActiveRecord::Migration
  def change
    add_column :steps, :flags, :string, array: true, default: []
  end
end
