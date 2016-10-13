require 'simplecov'
SimpleCov.start

require 'codecov'
SimpleCov.formatter = SimpleCov::Formatter::Codecov

require 'factory_girl_rails'
require 'database_cleaner'
require 'email_spec'
require 'devise'

Dir["./spec/support/**/*.rb"].sort.each { |f| require f }

RSpec.configure do |config|
  config.use_transactional_fixtures = false

  config.filter_run :focus
  config.run_all_when_everything_filtered = true

  config.include Devise::TestHelpers, :type => :controller
  config.include FactoryGirl::Syntax::Methods
  config.include(EmailSpec::Helpers)
  config.include(EmailSpec::Matchers)
  config.include(CommonActions)

  if ENV["CI"]
    config.include RSpec::Repeat
    config.around :each, type: :feature do |example|
      repeat example, 5.times, wait: 1, verbose: true
    end
  end

  config.around(:each) do |example|
    DatabaseCleaner.clean_with :truncation
    Rails.cache.clear
    ActionMailer::Base.deliveries = []
    $redis.flushdb
    load "#{Rails.root}/db/seeds.rb"
    Setting.reload!
    I18n.locale = :en

    example.run
  end

  config.after(:each, :js) do |example|
    sleep 1
  end

  config.before(:each, type: :feature) do
    Bullet.start_request

    create(:participatory_process, name: "pam")

    Setting['feature.debates'] = true
    Setting['feature.spending_proposals'] = true
  end

  config.after(:each, type: :feature) do
    Bullet.perform_out_of_channel_notifications if Bullet.notification?
    Bullet.end_request
  end

  # Allows RSpec to persist some state between runs in order to support
  # the `--only-failures` and `--next-failure` CLI options.
  config.example_status_persistence_file_path = "spec/examples.txt"

  # Many RSpec users commonly either run the entire suite or an individual
  # file, and it's useful to allow more verbose output when running an
  # individual spec file.
  if config.files_to_run.one?
    # Use the documentation formatter for detailed output,
    # unless a formatter has already been configured
    # (e.g. via a command-line flag).
    config.default_formatter = 'doc'
  end

  # Print the 10 slowest examples and example groups at the
  # end of the spec run, to help surface which specs are running
  # particularly slow.
  config.profile_examples = 10

  # Run specs in random order to surface order dependencies. If you find an
  # order dependency and want to debug it, you can fix the order by providing
  # the seed, which is printed after each run.
  #     --seed 1234
  config.order = :random

  # Seed global randomization in this process using the `--seed` CLI option.
  # Setting this allows you to use `--seed` to deterministically reproduce
  # test failures related to randomization by passing the same `--seed` value
  # as the one that triggered the failure.
  Kernel.srand config.seed
end
