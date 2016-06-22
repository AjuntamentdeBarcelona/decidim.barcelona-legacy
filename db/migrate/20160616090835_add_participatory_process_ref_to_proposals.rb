class AddParticipatoryProcessRefToProposals < ActiveRecord::Migration
  def change
    add_reference :proposals, :participatory_process, index: true, foreign_key: true
  end
end
