class MeetingPictures < ActiveRecord::Migration
  def change
    create_table :meeting_pictures do |t|
      t.string :file
      t.references :meeting
    end
  end
end
