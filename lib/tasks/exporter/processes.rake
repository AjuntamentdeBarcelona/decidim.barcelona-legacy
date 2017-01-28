require "exporter"

namespace :exporter do
  task :processes => :environment do
    data = ParticipatoryProcess.unscoped.find_each.map do |process|
      {
        id: process.id,
        slug: process.slug,
        hashtag: process.hashtag,
        created_at: process.created_at,
        updated_at: process.updated_at,
        title: process.title,
        subtitle: process.subtitle,
        short_description: process.summary,
        description: process.description,
        hero_image: process.full_image.try(:url),
        banner_image: process.banner_image.try(:url),
        promoted: process.featured,
        published_at: (process.published? ? process.created_at : nil),
        domain: process.areas,
        developer_group: process.manager_group,
        scope: process.scope,
        decidim_scope_name: District.find(process.district).try(:name),
        steps: steps(process),
        extra: {
          audience: process.audience,
          citizenship_scope: process.citizenship_scope,
          participatory_structure: process.participatory_structure
        }
      }
    end

    Exporter.write_json("processes", data)
  end

  def steps(process)
    process.steps.order(:position).map.with_index do |step, index|
      {
        id: step.id,
        title: step.title,
        description: step.description,
        start_at: step.start_at,
        end_at: step.end_at,
        position: index + 1,
        active: step.active,
        created_at: step.created_at,
        updated_at: step.updated_at,
        summary: step.summary,
        extra: {
          flags: step.flags,
          proposal_vote_limit: step.proposal_vote_limit
        }
      }
    end
  end
end
