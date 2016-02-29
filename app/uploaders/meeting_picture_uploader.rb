class MeetingPictureUploader < ApplicationUploader
  include CarrierWave::MiniMagick

  version :thumb do
    process :resize_to_fit => [100, 100]
  end

  version :medium do
    process :resize_to_fill => [400, 300]
  end

  def extension_white_list
    %w(jpg jpeg gif png)
  end
end
