class AddParticipatoryProcessRefToDebates < ActiveRecord::Migration
  def change
    add_reference :debates, :participatory_process, index: true, foreign_key: true
  end
end
