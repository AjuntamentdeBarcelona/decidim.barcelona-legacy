require "exporter"

namespace :exporter do
  task :attachments => :environment do
    data = ParticipatoryProcessAttachment.unscoped.find_each.map do |attachment|
      {
        id: attachment.id,
        title: Exporter.fake_translation(attachment.name),
        description: attachment.description,
        remote_file_url: attachment.file.url,
        process_id: attachment.participatory_process_id
      }
    end

    Exporter.write_json("attachments", data)
  end
end
