class ReferencesWorker
  include Sidekiq::Worker

  def perform(comment_id)
  end
end
