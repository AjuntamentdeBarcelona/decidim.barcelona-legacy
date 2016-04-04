class Moderation::ActionPlansController < Moderation::BaseController
  include ModerateActions

  has_filters %w{all}, only: :index
  has_orders %w{created_at}, only: :index

  before_action :load_resources, only: [:index]

  load_and_authorize_resource

  def new
    @resource = resource_model.new
    set_resource_instance
  end

  private

  def resource_model
    ActionPlan
  end
end
