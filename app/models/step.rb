class Step < ActiveRecord::Base
  FLAGS = %w{proposals proposals_readonly action_plans meetings debates}
  belongs_to :participatory_process

  acts_as_paranoid column: :hidden_at
  include ActsAsParanoidAliases

  serialize :title, JSON
  serialize :description, JSON

  def self.step_for(participatory_process, flag)
    participatory_process.steps.reverse.detect do |step|
      step.flags.map(&:to_s).include?(flag.to_s)
    end
  end

  def feature_enabled?(name)
    flags.include?(name.to_s)
  end
end
