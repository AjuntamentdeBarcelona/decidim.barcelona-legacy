class Step < ActiveRecord::Base
  belongs_to :participatory_process

  acts_as_paranoid column: :hidden_at
  include ActsAsParanoidAliases

  serialize :title, JSON
  serialize :description, JSON
end
