class Step < ActiveRecord::Base
  FLAGS = %w{proposals action_plans meetings debates}
  belongs_to :participatory_process

  acts_as_paranoid column: :hidden_at
  include ActsAsParanoidAliases

  serialize :title, JSON
  serialize :description, JSON

  FLAGS.each do |feature|
    define_method "has_#{feature}?" do
      flags.include?(feature)
    end
  end
end
