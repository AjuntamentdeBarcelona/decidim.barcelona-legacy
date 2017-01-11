class ParticipatoryProcessAttachmentDecorator < ApplicationDecorator
  delegate_all
  translates :description

  def type
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
    return 'pdf' if ['pdf'].include?(submime)
    return 'doc' if ['msword'].include?(submime)

    return nil
  end

  def submime
    content_type.to_s.split("/").last
  end

  def url
    file.try(:url)
  end
end
