class PreferencesMatrixWorker
  include Sidekiq::Worker

  def perform
    scales = Proposal.all.map { |proposal| Recommendations::ProposalScale.new(proposal) }
    store = Recommendations::RedisMatrixStore.new('user_preferences')
    Recommendations::PreferencesMatrix.new(store, scales, User.pluck(:id)).save

    self.class.perform_at(DateTime.tomorrow.to_datetime.change({ hour: 4, min: 0, sec: 0 }))
  end
end
