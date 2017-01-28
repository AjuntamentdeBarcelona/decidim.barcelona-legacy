require "exporter"

namespace :exporter do
  task :user_groups => :environment do
    data = Organization.unscoped.find_each.map do |organization|
      {
        id: organization.id,
        user_id: organization.user_id,
        name: organization.name,
        verified_at: organization.verified_at,
        document_number: organization.document_number,
        extra: {
          responsible_name: organization.responsible_name
        }
      }
    end

    Exporter.write_json("user_groups", data)
  end
end
