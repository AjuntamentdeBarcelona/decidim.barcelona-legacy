workers Integer(ENV['WEB_CONCURRENCY'] || 2)
threads_count = Integer(ENV['MAX_THREADS'] || 5)
threads threads_count, threads_count

preload_app!

rackup      DefaultRackup
port        ENV['PORT']     || 3000
environment ENV['RACK_ENV'] || 'development'

before_fork do
  if defined?(PumaWorkerKiller)
    PumaWorkerKiller.config do |config|
      config.ram           = 1024 # mb
      config.frequency     = 5    # seconds
      config.percent_usage = 0.98
      config.rolling_restart_frequency = 12 * 3600 # 12 hours in seconds
    end
    PumaWorkerKiller.start
  end
end

on_worker_boot do
  # Worker specific setup for Rails 4.1+
  # See: https://devcenter.heroku.com/articles/deploying-rails-applications-with-the-puma-web-server#on-worker-boot
  ActiveRecord::Base.establish_connection
end
