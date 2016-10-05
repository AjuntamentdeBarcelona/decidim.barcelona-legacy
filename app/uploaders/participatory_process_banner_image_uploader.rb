class ParticipatoryProcessBannerImageUploader < ApplicationUploader
  include CarrierWave::MiniMagick

  process resize_to_fit: [1200, 300]

  version :thumb do
    process resize_to_fill: [300, 75]
  end

  def extension_white_list
    %w(jpg jpeg gif png)
  end
end
