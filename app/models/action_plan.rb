class ActionPlan < ActiveRecord::Base
  include PgSearch
  include SearchCache

  belongs_to :category
  belongs_to :subcategory

  has_and_belongs_to_many :proposals

  validates :title, :description, :category, :subcategory, presence: true

  pg_search_scope :pg_search, {
    against: {
      title:       'A',
      description: 'B'
    },
    using: {
      tsearch: { dictionary: "spanish", tsvector_column: 'tsv' }
    },
    ignoring: :accents,
    ranked_by: '(:tsearch)'
  }

  def searchable_values
    values = {
      title       => 'A',
      description => 'B'
    }
    values
  end

  def self.search(terms)
    self.pg_search(terms)
  end

  def self.sort_by_created_at
    order('created_at desc')
  end
end
