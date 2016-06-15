class AddMissingIndexesForMeetings < ActiveRecord::Migration
  def change
    add_index :meeting_pictures, :meeting_id
    add_index :meetings_proposals, :meeting_id
    add_index :meetings_proposals, :proposal_id
  end
end
