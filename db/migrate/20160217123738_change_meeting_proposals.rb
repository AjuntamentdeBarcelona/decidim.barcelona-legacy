class ChangeMeetingProposals < ActiveRecord::Migration
  def change
    remove_column :meetings_proposals, :groups
    remove_column :meetings_proposals, :votes
    add_column :meetings_proposals, :consensus, :boolean
  end
end
