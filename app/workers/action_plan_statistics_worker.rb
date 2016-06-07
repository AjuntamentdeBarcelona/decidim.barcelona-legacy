class ActionPlanStatisticsWorker
  include Sidekiq::Worker

  def perform(action_plan_id)
    action_plan = ActionPlan.find(action_plan_id)
    action_plan.compute_statistics
  end
end
