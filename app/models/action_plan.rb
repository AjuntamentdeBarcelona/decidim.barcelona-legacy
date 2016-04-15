class ActionPlan < ActiveRecord::Base
  belongs_to :category
  belongs_to :subcategory

  has_many :revisions, class_name: ActionPlanRevision, dependent: :destroy

  has_and_belongs_to_many :proposals, dependent: :destroy

  validates :category, :subcategory, presence: true
  validates :scope, inclusion: { in: %w(city district) }
  validates :district, inclusion: { in: District.all.map(&:id), allow_nil: true }

  delegate :title, :description, to: :current_revision, allow_nil: true

  def self.sort_by_created_at
    order('created_at desc')
  end

  def self.search(terms)
    where(id: ActionPlanRevision.pg_search(terms).pluck(:id))
  end

  def current_revision
    revisions.first
  end
end
