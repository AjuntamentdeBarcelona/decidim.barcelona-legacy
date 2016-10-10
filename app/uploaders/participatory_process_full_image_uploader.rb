class ParticipatoryProcessFullImageUploader < ApplicationUploader
  include CarrierWave::MiniMagick

  process resize_to_fit: [1035, 667]

  version :thumb do
    process resize_to_fill: [259, 167]
  end

  def extension_white_list
    %w(jpg jpeg gif png)
  end
end
