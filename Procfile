web: bundle exec passenger start -p $PORT --max-pool-size 2
worker: bundle exec sidekiq -C config/sidekiq.yml
