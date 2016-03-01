ENV['RAILS_ENV'] ||= 'test'
require File.expand_path('../../config/environment', __FILE__)
abort("The Rails environment is running in production mode!") if Rails.env.production?

require 'rspec/rails'
require 'spec_helper'
require 'capybara/rails'
require 'capybara/rspec'
require 'capybara/poltergeist'
require 'capybara-screenshot/rspec'
require 'sidekiq/testing'

Dir.glob(Rails.root.join("spec", "concerns", "*.rb")).each do |file|
  require file
end

Sidekiq::Testing.inline!

I18n.default_locale = :en

include Warden::Test::Helpers
Warden.test_mode!

RSpec.configure do |config|
  config.infer_spec_type_from_file_location!
end

Capybara.register_driver :poltergeist do |app|
  Capybara::Poltergeist::Driver.new(app, js_errors: false)
end

Capybara.javascript_driver = :poltergeist
Capybara.exact = true

Capybara::Screenshot::RSpec.add_link_to_screenshot_for_failed_examples = false
Capybara::Screenshot.webkit_options = { width: 1024, height: 768 }
Capybara::Screenshot.prune_strategy = :keep_last_run

SimpleCaptcha.always_pass = Rails.env.test?

OmniAuth.config.test_mode = true
