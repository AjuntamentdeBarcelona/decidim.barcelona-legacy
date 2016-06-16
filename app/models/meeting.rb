class Meeting < ActiveRecord::Base
  extend FriendlyId
  include PgSearch
  include SearchCache
  include Categorizable
  include Taggable

  belongs_to :author, -> { with_hidden }, class_name: 'User', foreign_key: 'author_id'
  belongs_to :participatory_process

  has_many :meeting_proposals, dependent: :destroy
  accepts_nested_attributes_for :meeting_proposals
  has_many :proposals, through: :meeting_proposals, before_remove: proc { |m, p| MeetingProposal.where(meeting: m, proposal: p).destroy_all }

  has_many :pictures, class_name: 'MeetingPicture'
  accepts_nested_attributes_for :pictures, allow_destroy: true,
                                reject_if: lambda { |p| p[:file].blank? && p[:file_cache].blank? }

  scope :pending, -> { where(closed_at: nil) } 
  scope :closed, -> { where('closed_at is not ?', nil) } 
  scope :upcoming, -> { where("held_at >= ?", Date.today).order(:held_at) }
  scope :past, -> { where("held_at < ?", Date.today).order('held_at desc') }

  validates :author, presence: true
  validates :title, presence: true
  validates :address, presence: true
  validates :held_at, presence: true
  validates :scope, inclusion: { in: %w(city district) }
  validates :district, inclusion: { in: District.all.map(&:id), allow_nil: true }

  def closed?
    !!closed_at
  end

  def upcoming?
    held_at >= Time.now
  end

  pg_search_scope :pg_search, {
    against: {
      title:       'A',
      description: 'B'
    },
    associated_against: {
      tags: :name
    },
    using: {
      tsearch: { dictionary: "spanish", tsvector_column: 'tsv' }
    },
    ignoring: :accents,
    ranked_by: '(:tsearch)'
  }

  friendly_id :title, use: [:slugged, :finders]

  def code
    "#{Setting["meeting_code_prefix"]}-#{created_at.strftime('%Y-%m')}-#{id}"
  end

  def searchable_values
    values = {
      title       => 'A',
      description => 'B'
    }
    tag_list.each{ |tag| values[tag] = 'C' }
    values[author.username] = 'C'
    values
  end

  def self.search(terms)
    self.pg_search(terms)
  end

  def organization_count
    organizations.split(",").select {|o| !o.blank? }.count
  end
end
