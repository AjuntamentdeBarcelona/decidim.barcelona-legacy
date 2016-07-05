class Newsletter < ActiveRecord::Base
  validates :title, :body, presence: true
  serialize :title, JSON
  serialize :body, JSON

  def self.sent
    where.not(sent_at: nil)
  end

  def self.unsent
    where(sent_at: nil)
  end
end
