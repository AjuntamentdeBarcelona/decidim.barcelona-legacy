class MeetingProposal < ActiveRecord::Base
  self.table_name = 'meetings_proposals'

  belongs_to :meeting
  belongs_to :proposal

  delegate :title, to: :proposal

  validates :meeting, :proposal, presence: true
end
