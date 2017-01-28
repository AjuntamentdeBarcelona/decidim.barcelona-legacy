require "exporter"

namespace :exporter do
  task :proposals => :environment do
    data = Proposal.unscoped.find_each.map do |proposal|
      {
        id: proposal.id
      }
    end

    Exporter.write_json("proposals", data)
  end
end
