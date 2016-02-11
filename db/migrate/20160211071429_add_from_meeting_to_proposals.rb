class AddFromMeetingToProposals < ActiveRecord::Migration
  def change
    change_table :proposals do |t|
      t.boolean :from_meeting, index: true
    end
  end
end
