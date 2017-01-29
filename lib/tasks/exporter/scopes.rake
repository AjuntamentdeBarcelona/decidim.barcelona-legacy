require "exporter"

namespace :exporter do
  task :scopes => :environment do
    data = District.all.map do |district|
      {
        id: district.id,
        name: district.name,
      }
    end

    Exporter.write_json("scopes", data)
  end
end
