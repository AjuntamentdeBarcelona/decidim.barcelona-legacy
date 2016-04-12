class Follow < ActiveRecord::Base
  belongs_to :follower, class_name: User
  belongs_to :following, polymorphic: true 

  validates :following, presence: true
  validates :following_id, uniqueness: { scope: :follower_id }
end
