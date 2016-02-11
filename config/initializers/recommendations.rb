Warden::Manager.after_set_user except: :fetch do |record, warden, options|
  RecommendationsWorker.perform_async(record.id)
end
