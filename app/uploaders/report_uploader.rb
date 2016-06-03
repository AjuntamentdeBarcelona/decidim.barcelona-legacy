class ReportUploader < ApplicationUploader
  def extension_white_list
    %w(html doc docx zip)
  end
end
