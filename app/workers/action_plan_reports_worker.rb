class ActionPlanReportsWorker
  include Sidekiq::Worker

  def perform(report_id)
    report = ActionPlanReport.find(report_id)
    raise "Already generated" unless report.pending?

    zipio = Zip::OutputStream::write_buffer do |zio|
      report_generator = ActionPlanReportGenerator.new
      report_data = report_generator.report

      report_data.each do |key, value|
        zio.put_next_entry("#{key}.html")
        zio.write value
      end
    end

    zipio.rewind

    tempfile = Tempfile.new("action_plan_report")
    tempfile.write zipio.sysread
    tempfile.rewind

    file = ActionDispatch::Http::UploadedFile.new(tempfile: tempfile,
                                                  content_type: 'application/zip',
                                                  filename: "action_plan_report.zip")

    report.file = file
    report.pending = false
    report.save!
  end
end
