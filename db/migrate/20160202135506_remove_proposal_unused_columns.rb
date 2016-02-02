class RemoveProposalUnusedColumns < ActiveRecord::Migration
  def up
    remove_column :proposals, :question
    remove_column :proposals, :description
  end

  def down
    add_column :proposals, :description, :text
    add_column :proposals, :question, :string
  end
end
