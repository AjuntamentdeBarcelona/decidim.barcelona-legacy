class ActionPlanReportGenerator < ActionView::Base
  include ApplicationHelper
  include Rails.application.routes.url_helpers

  def initialize
    super(ActionController::Base.view_paths, {})
  end

  def report
    render(file: 'revision/action_plan_reports/report.html.erb')
  end

  def categories
    Category.includes(:subcategories)
  end

  def city_action_plans
    scope.where(scope: 'city').limit(10)
  end

  def district_action_plans(district)
    scope.where(scope: 'district', district: district.id).limit(10)
  end

  def from_subcategory(action_plans, district)
    decorate(
      action_plans.where(subcategory_id: district.id)
    )
  end

  private

  def scope
    ActionPlan.all
  end

  def decorate(action_plans)
    action_plans.map do |action_plan| 
      ActionPlanDecorator.decorate(action_plan)
    end
  end

  class ActionPlanDecorator < Draper::Decorator
    delegate_all

    def authors
      object.
        proposals.order('cached_votes_up desc').
        map(&:author).map(&:name).join(", ")
    end

    def proposal_codes
      object.proposals.map(&:code).join(", ")
    end

    def total_votes
      object.proposals.to_a.sum(&:cached_votes_up)
    end

    def meetings
      object.proposals.flat_map(&:meetings)
    end

    def meeting_participants
      meetings.map(&:organizations).map(&:strip).reject(&:blank?).join(", ")
    end
  end
end
