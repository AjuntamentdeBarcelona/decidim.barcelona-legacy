class RecommendationsWorker
  include Sidekiq::Worker

  def perform(user_id)
    user = User.find(user_id)
    Recommendations::Persistence.fetch_recommendations_for(user)
  end
end
