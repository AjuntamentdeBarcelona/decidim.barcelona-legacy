class AddInstructionsToDebates < ActiveRecord::Migration
  def change
    change_table :debates do |t|
      t.text :instructions
    end
  end
end
