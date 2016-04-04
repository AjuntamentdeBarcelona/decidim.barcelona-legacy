class ActionPlan < ActiveRecord::Base
  belongs_to :category
  belongs_to :subcategory

  validates :title, :description, :category, :subcategory, presence: true

  def self.sort_by_created_at
    order('created_at desc')
  end
end
