class ActionPlanReportsWorker
  include Sidekiq::Worker

  def perform(report_id)
    report = ActionPlanReport.find(report_id)
    raise "Already generated" unless report.pending?

    report_generator = ActionPlanReportGenerator.new
    report_data = report_generator.report

    tempfile = Tempfile.new("action_plan_report")
    tempfile.write report_data
    tempfile.rewind

    file = ActionDispatch::Http::UploadedFile.new(tempfile: tempfile,
                                                  content_type: 'application/msword',
                                                  filename: "action_plan_report.doc")

    report.file = file
    report.pending = false
    report.save!
  end
end
