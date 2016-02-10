namespace :recommendations do
  desc "Compute preferences matrix and store it on redis"
  task compute_pref_matrix: :environment do
    scales = Proposal.all.map { |proposal| Recommendations::ProposalScale.new(proposal) }
    store = Recommendations::RedisMatrixStore.new('user_preferences')
    Recommendations::PreferencesMatrix.new(store, scales, User.pluck(:id)).save
  end

  desc "Expire all users recommendations"
  task expire_recommendations: :environment do
    keys = $redis.keys("#{Recommendations::Persistence::KEY_PREFIX}*") 
    $redis.pipelined do
      keys.each do |key|
        $redis.del key
      end
    end
  end
end
