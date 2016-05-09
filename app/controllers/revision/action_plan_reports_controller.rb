class Revision::ActionPlanReportsController < Revision::BaseController
  include ModerateActions

  has_filters %w{generated pending}, only: :index
  has_orders %w{created_at_desc}, only: :index

  before_action :load_resources, only: [:index]

  load_and_authorize_resource

  def create
    report = ActionPlanReport.create!

    ActionPlanReportsWorker.perform_async(report.id)
    redirect_to :back, notice: "Blah"
  end

  private

  def resource_model
    ActionPlanReport
  end
end
