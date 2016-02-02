class RenameProposalSummaryToDescription < ActiveRecord::Migration
  def up
    rename_column :proposals, :summary, :description
  end

  def down 
    rename_column :proposals, :description, :summary
  end
end
