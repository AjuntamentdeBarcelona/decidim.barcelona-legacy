class Recommendation < ActiveRecord::Base
  default_scope -> { order(score: :desc) }

  belongs_to :user
  belongs_to :proposal
end
