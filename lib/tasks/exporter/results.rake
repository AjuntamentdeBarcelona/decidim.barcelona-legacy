require "exporter"

namespace :exporter do
  task :results => :environment do
    data = ActionPlan.unscoped.where(approved: true).includes(:revisions).find_each.map do |action_plan|
      {
        id: action_plan.id,
        title: action_plan.title,
        description: action_plan.description,
        created_at: action_plan.created_at,
        updated_at: action_plan.updated_at,
        category_id: action_plan.category_id,
        subcategory_id: action_plan.subcategory_id,
        scope_id: action_plan.district,
        process_id: action_plan.participatory_process_id,
        proposal_ids: action_plan.proposals.pluck(:id),

        extra: {
          weight: action_plan.weight,
          revisions: action_plan.revisions.map(&:attributes)
        }
      }
    end

    Exporter.write_json("results", data)
  end
end
