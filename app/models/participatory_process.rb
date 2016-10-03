class ParticipatoryProcess < ActiveRecord::Base
  extend FriendlyId
  acts_as_paranoid column: :hidden_at
  include ActsAsParanoidAliases

  validates :name, presence: true
  friendly_id :name, use: [:slugged, :finders]

  mount_uploader :full_image, ParticipatoryProcess::FullImageUploader
  mount_uploader :banner_image, ParticipatoryProcess::BannerImageUploader

  serialize :title, JSON
  serialize :subtitle, JSON
  serialize :summary, JSON
  serialize :description, JSON

  has_many :proposals
  has_many :action_plans
  has_many :meetings
  has_many :debates
  has_many :categories
  has_many :subcategories
end
