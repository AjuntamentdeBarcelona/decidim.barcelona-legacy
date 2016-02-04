namespace :preferences_matrix do
  desc "Compute preferences matrix and store it on redis"
  task compute: :environment do
    scales = Proposal.all.map { |proposal| Recommendations::ProposalScale.new(proposal) }
    store = Recommendations::RedisMatrixStore.new('user_preferences')
    Recommendations::PreferencesMatrix.new(store, scales, User.pluck(:id)).save
  end
end
