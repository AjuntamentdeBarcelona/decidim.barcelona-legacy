if Rails.env.production? || ENV['GAFFE']
  Gaffe.configure do |config|
    config.errors_controller = 'ErrorsController'
  end

  Gaffe.enable!
end
