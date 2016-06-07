class ActionPlanStatisticsWorker
  include Sidekiq::Worker

  def perform(action_plan_id)
    action_plan = ActionPlan.find(action_plan_id)
    ActionPlanStatisticsCalculator.compute_statistics_for(action_plan)
  end
end
