require "exporter"

namespace :exporter do
  task :proposal_votes => :environment do
    data = Vote.where(votable_type: "Proposal").unscoped.find_each.map do |vote|
      {
        proposal_id: vote.votable_id,
        user_id: vote.voter_id,
        created_at: vote.created_at
      }
    end

    Exporter.write_json("proposal_votes", data)
  end
end
