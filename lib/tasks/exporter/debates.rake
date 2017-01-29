require "exporter"

namespace :exporter do
  task :debates => :environment do
    data = Debate.unscoped.find_each.map do |debate|
      {
        id: debate.id,
        title: debate.title,
        description: debate.description,
        created_at: debate.created_at,
        updated_at: debate.updated_at,

        process_id: debate.participatory_process_id,
        instructions: debate.instructions,
        start_time: debate.starts_at,
        end_time: debate.ends_at,
        remote_image_url: debate.picture.try(:url),
        extra: {
          slug: debate.slug
        }
      }
    end

    Exporter.write_json("debates", data)
  end
end
