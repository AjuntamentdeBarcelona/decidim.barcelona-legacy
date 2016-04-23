class ActionPlanRevision < ActiveRecord::Base
  include PgSearch
  include SearchCache
  include Sanitizable

  default_scope { order('created_at desc') } 

  validates :title, :description, presence: true

  belongs_to :action_plan
  belongs_to :author, class_name: User

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
end
