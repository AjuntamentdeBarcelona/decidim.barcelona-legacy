class ParticipatoryProcess < ActiveRecord::Base
  extend FriendlyId
  acts_as_paranoid column: :hidden_at
  include ActsAsParanoidAliases

  validates :name, presence: true
  friendly_id :name, use: [:slugged, :finders]

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

  Step::FLAGS.each do |feature|
    delegate "has_#{feature}?", to: :active_step
  end

  def active_step
    @active_step ||= steps.where(active: true).first
  end
end
