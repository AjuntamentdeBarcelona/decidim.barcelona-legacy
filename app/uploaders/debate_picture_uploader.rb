class DebatePictureUploader < ApplicationUploader
  include CarrierWave::MiniMagick

  version :medium do
    process :resize_to_fill => [600, 800]
  end

  def extension_white_list
    %w(jpg jpeg gif png)
  end
end
