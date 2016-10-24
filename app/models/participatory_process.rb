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
  has_many :steps, -> { order(:position) }
  has_many :attachments, class_name: 'ParticipatoryProcessAttachment'

  scope :featured, -> { where(featured: true) }

  delegate :feature_enabled?, to: :active_step, allow_nil: true

  def active_step
    @active_step ||= steps.where(active: true).first
  end
end
