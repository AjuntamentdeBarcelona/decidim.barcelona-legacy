require_dependency 'style_validator'

class Proposal < ActiveRecord::Base
  extend FriendlyId
  include Flaggable
  include Taggable
  include Conflictable
  include Measurable
  include Sanitizable
  include PgSearch
  include SearchCache
  include Categorizable
  include Filterable

  acts_as_votable
  acts_as_paranoid column: :hidden_at
  include ActsAsParanoidAliases

  belongs_to :author, -> { with_hidden }, class_name: 'User', foreign_key: 'author_id'
  belongs_to :participatory_process
  has_many :comments, as: :commentable
  has_many :meeting_proposals, dependent: :destroy
  has_many :meetings, through: :meeting_proposals
  has_many :recommendations
  has_one  :answer, class_name: ProposalAnswer

  has_and_belongs_to_many :action_plans

  validates :title, presence: true
  validates :title, :summary, style: true, on: :create
  validates :summary, presence: true, length: { maximum: 1000 }
  validates :author, presence: true
  validates :responsible_name, presence: true

  validates :title, length: { in: 4..Proposal.title_max_length }
  validates :description, length: { maximum: Proposal.description_max_length }
  validates :scope, inclusion: { in: %w(city district) }
  validates :district, inclusion: { in: District.all.map(&:id), allow_nil: true }
  validates :question, length: { in: 10..Proposal.question_max_length }, allow_blank: true
  validates :responsible_name, length: { in: 6..Proposal.responsible_name_max_length }

  before_validation :set_responsible_name

  after_commit :calculate_scores

  scope :for_render,               -> { includes(:tags) }
  scope :sort_by_hot_score ,       -> { reorder(hot_score: :desc) }
  scope :sort_by_confidence_score, -> { reorder(confidence_score: :desc) }
  scope :sort_by_created_at,       -> { reorder(created_at: :desc) }
  scope :sort_by_created_at_asc,   -> { reorder(created_at: :asc) }
  scope :sort_by_most_commented,   -> { reorder(comments_count: :desc) }
  scope :sort_by_random,           -> { reorder("RANDOM()") }
  scope :sort_by_relevance ,       -> { all }
  scope :sort_by_flags,            -> { order(flags_count: :desc, updated_at: :desc) }
  scope :last_week,                -> { where("created_at >= ?", 7.days.ago)}

  scope :accepted, -> { includes(:answer).where(proposal_answers: { status: 'accepted' })}
  
  pg_search_scope :pg_search, {
    against: {
      title:       'A',
      question:    'B',
      summary:     'C',
      description: 'D'
    },
    associated_against: {
      tags: :name
    },
    using: {
      tsearch: { dictionary: "spanish", tsvector_column: 'tsv', prefix: true }
    },
    ignoring: :accents,
    ranked_by: '(:tsearch)',
    order_within_rank: "proposals.cached_votes_up DESC"
  }

  friendly_id :title, use: [:slugged, :finders]

  def searchable_values
    values = {
      code       => 'A',
      title       => 'A',
      question    => 'B',
      summary     => 'C',
      description => 'D'
    }
    tag_list.each{ |tag| values[tag] = 'D' }
    values[author.username] = 'D'
    values
  end

  def self.search(terms)
    self.pg_search(terms)
  end

  def description
    super.try :html_safe
  end

  def total_votes
    cached_votes_up + physical_votes
  end

  def editable?
    total_votes <= Setting["max_votes_for_proposal_edit"].to_i
  end

  def editable_by?(user)
    author_id == user.id && editable?
  end

  def votable_by?(user)
    user && user.level_two_or_three_verified?
  end

  def register_vote(user, vote_value)
    if votable_by?(user)
      vote_by(voter: user, vote: vote_value)
    end
  end

  def code
    "#{Setting["proposal_code_prefix"]}-#{created_at.strftime('%Y-%m')}-#{id}"
  end

  def after_commented
    touch
    calculate_scores
  end

  def calculate_scores
    ProposalScoreCalculatorWorker.perform_async(id)
  end

  def after_hide
    self.tags.each{ |t| t.decrement_custom_counter_for('Proposal') }
  end

  def after_restore
    self.tags.each{ |t| t.increment_custom_counter_for('Proposal') }
  end

  def arguable?
    true
  end

  def references
    Reference.references_for(self)
  end

  def source
    return 'meeting' if from_meeting
    return 'official' if official
    return 'organization' if author.organization?
    return 'citizen'
  end

  def district_object
    @district_object ||= District.find(district) if district
  end

  def self.reviewed
    joins(:answer).where("proposal_answers.proposal_id = proposals.id")
  end

  def self.not_reviewed
    where.not(id: reviewed)
  end

  protected

    def set_responsible_name
      if author && author.document_number?
        self.responsible_name = author.document_number
      end
    end

end
