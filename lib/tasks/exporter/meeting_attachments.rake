require "exporter"

namespace :exporter do
  task :meeting_attachments => :environment do
    data = MeetingPicture.unscoped.find_each.map do |attachment|
      {
        id: attachment.id,
        remote_file_url: attachment.file.url,
        meeting_id: attachment.meeting_id
      }
    end

    Exporter.write_json("meeting_attachments", data)
  end
end
