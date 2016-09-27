class ParticipatoryProcess < ActiveRecord::Base
  FLAGS = %w{proposals action_plans meetings debates}

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

  FLAGS.each do |feature|
    define_method "has_#{feature}?" do
      flags.include?(feature)
    end
  end
end
