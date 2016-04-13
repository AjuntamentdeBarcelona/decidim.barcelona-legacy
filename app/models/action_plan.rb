class ActionPlan < ActiveRecord::Base
  belongs_to :category
  belongs_to :subcategory

  has_and_belongs_to_many :proposals

  validates :title, :description, :category, :subcategory, presence: true

  def self.sort_by_created_at
    order('created_at desc')
  end
end
