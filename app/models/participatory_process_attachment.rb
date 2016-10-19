class ParticipatoryProcessAttachment < ActiveRecord::Base
  validates :participatory_process, presence: true
  belongs_to :participatory_process

  serialize :description, JSON

  mount_uploader :file, ParticipatoryProcessAttachmentUploader
end
