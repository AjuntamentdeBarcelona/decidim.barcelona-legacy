# encoding: utf-8

class ParticipatoryProcessAttachmentUploader < CarrierWave::Uploader::Base
  include CarrierWave::MimeTypes

  process :set_content_type
  process :save_content_type_and_size_in_model

  def store_dir
    "uploads/participatory_processes/#{model.participatory_process.to_param}/#{mounted_as}/#{model.id}"
  end

  def save_content_type_and_size_in_model
    model.content_type = file.content_type if file.content_type
    model.file_size = file.size
  end
end
