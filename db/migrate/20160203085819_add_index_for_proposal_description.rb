class AddIndexForProposalDescription < ActiveRecord::Migration
  def change
    add_index :proposals, :description
  end
end
