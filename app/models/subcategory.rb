class Subcategory < ActiveRecord::Base
  belongs_to :participatory_process
  belongs_to :category

  serialize :name, JSON
  serialize :description, JSON

  validates :name, :category, presence: true
  has_many :action_plans
  has_many :proposals
end
