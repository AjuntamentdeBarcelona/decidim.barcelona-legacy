class AddAttendeeCountToMeetings < ActiveRecord::Migration
  def change
    change_table :meetings do |t|
      t.integer :attendee_count
    end
  end
end
