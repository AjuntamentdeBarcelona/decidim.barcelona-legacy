class CacheMeetingProposalsCount < ActiveRecord::Migration
  def up
    Meeting.find_each do |meeting|
      proposals_count = MeetingProposal.where(meeting_id: meeting.id).size
      ActiveRecord::Base.connection.execute("UPDATE meetings SET proposals_count=#{proposals_count} WHERE id=#{meeting.id}")
    end
  end

  def down
  end
end
