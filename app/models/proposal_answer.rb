class ProposalAnswer < ActiveRecord::Base
  belongs_to :proposal

  validates :proposal_id, presence: true
  validates :status, inclusion: %w(accepted rejected)

  before_validation :sanitize_message

  private

  def sanitize_message
    self.message = WYSIWYGSanitizer.new.sanitize(message)
  end
end
