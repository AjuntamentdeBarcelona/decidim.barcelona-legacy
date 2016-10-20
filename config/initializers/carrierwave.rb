CarrierWave.configure do |config|
  if Rails.application.secrets.aws_access_key_id
    config.storage = :fog
    config.fog_credentials = {
      provider:              'AWS',
      aws_access_key_id:     Rails.application.secrets.aws_access_key_id,
      aws_secret_access_key: Rails.application.secrets.aws_secret_access_key,
      host:                  Rails.application.secrets.aws_host,
      region:                Rails.application.secrets.aws_region
    }

    config.fog_directory  = Rails.application.secrets.aws_bucket
    config.fog_public     = true
    config.fog_attributes = { 'Cache-Control' => "max-age=#{365.day.to_i}" }
  else
    config.storage = :file
  end

  config.cache_dir = "#{Rails.root}/tmp/uploads"
end
