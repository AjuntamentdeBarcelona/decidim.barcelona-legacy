class MeetingPicture < ActiveRecord::Base
  belongs_to :meeting
  validates :file, presence: true
  mount_uploader :file, MeetingPictureUploader
end
