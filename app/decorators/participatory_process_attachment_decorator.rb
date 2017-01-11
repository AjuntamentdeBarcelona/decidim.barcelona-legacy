class ParticipatoryProcessAttachmentDecorator < ApplicationDecorator
  delegate_all
  translates :description

  def type
    submime = content_type.to_s.split("/").last

    if ["jpeg", "gif"].include?(submime)
      return :image
    else
      return :document
    end
  end

  def file_size
    h.number_to_human_size object.file_size
  end

  def label
    submime = content_type.to_s.split("/").last

    return 'pdf' if ['pdf'].include?(submime)
    return 'doc' if ['msword'].include?(submime)

    return nil
  end

  def url
    file.try(:url)
  end
end
