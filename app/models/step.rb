class Step < ActiveRecord::Base
  FLAGS = %w{proposals action_plans meetings debates}
  belongs_to :participatory_process

  acts_as_paranoid column: :hidden_at
  include ActsAsParanoidAliases

  serialize :title, JSON
  serialize :description, JSON

  def feature_enabled?(name)
    flags.include?(name.to_s)
  end
end
