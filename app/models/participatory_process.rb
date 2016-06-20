class ParticipatoryProcess < ActiveRecord::Base
  extend FriendlyId

  validates :name, presence: true
  friendly_id :name, use: [:slugged, :finders]

  has_many :proposals
  has_many :meetings
  has_many :debates
  has_many :categories
  has_many :subcategories
end
