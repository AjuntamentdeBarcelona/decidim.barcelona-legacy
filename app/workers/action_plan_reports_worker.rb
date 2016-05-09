class ActionPlanReportsWorker
  include Sidekiq::Worker

  def perform(report_id)
    report = ActionPlanReport.find(report_id)
    report.generate
  end
end
