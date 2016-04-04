class ProposalAnswer < ActiveRecord::Base
  belongs_to :proposal

  validates :proposal_id, presence: true
  validates :status, inclusion: %w(accepted rejected pending)
end
