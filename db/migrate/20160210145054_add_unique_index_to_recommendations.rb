class AddUniqueIndexToRecommendations < ActiveRecord::Migration
  def change
    add_index :recommendations, [:user_id, :proposal_id], :unique => true
  end
end
