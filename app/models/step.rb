class Step < ActiveRecord::Base
  FLAGS = %w{proposals proposals_readonly action_plans meetings debates}

  belongs_to :participatory_process
  validates :participatory_process, presence: true

  acts_as_paranoid column: :hidden_at
  include ActsAsParanoidAliases

  serialize :title, JSON
  serialize :description, JSON

  def feature_enabled?(name)
    flags.include?(name.to_s)
  end

  def current?
    participatory_process.active_step == self
  end
end
