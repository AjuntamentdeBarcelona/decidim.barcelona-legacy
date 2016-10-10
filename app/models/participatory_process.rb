class ParticipatoryProcess < ActiveRecord::Base
  extend FriendlyId
  acts_as_paranoid column: :hidden_at
  include ActsAsParanoidAliases

  scope :published, -> { where(published: true) }
  scope :unpublished, -> { where(published: false) }

  validates :name, presence: true
  friendly_id :name, use: [:slugged, :finders]

  mount_uploader :full_image, ParticipatoryProcessFullImageUploader
  mount_uploader :banner_image, ParticipatoryProcessBannerImageUploader

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
  has_many :steps

  delegate :feature_enabled?, to: :active_step

  def active_step
    @active_step ||= steps.where(active: true).first
  end
end
