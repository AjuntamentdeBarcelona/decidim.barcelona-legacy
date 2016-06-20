class AddProposalsCountToMeetings < ActiveRecord::Migration
  def change
    add_column :meetings, :proposals_count, :integer, default: 0, null: false
  end
end
