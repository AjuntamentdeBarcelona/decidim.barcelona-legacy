class RemoveUnusedProposalFields < ActiveRecord::Migration
  def change
    remove_column :proposals, :question
    remove_column :proposals, :summary
  end

  def down
    add_column :proposals, :summary, :text
    add_column :proposals, :question, :string
  end
end
