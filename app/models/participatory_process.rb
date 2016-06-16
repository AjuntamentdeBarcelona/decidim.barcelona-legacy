class ParticipatoryProcess < ActiveRecord::Base
  extend FriendlyId

  validates :name, presence: true
  friendly_id :name, use: [:slugged, :finders]

  has_many :proposals
end
