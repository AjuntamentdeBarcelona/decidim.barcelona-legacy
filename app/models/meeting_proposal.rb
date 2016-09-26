class MeetingProposal < ActiveRecord::Base
  self.table_name = 'meetings_proposals'

  belongs_to :meeting, counter_cache: :proposals_count
  belongs_to :proposal

  delegate :title, :participatory_process, to: :proposal
end
