class Revision::ProposalsController < Revision::BaseController
  include ModerateActions

  has_filters %w{not_reviewed reviewed}, only: :index
  has_orders %w{created_at_asc}, only: :index

  before_action :load_resources, only: [:index]

  load_and_authorize_resource

  private

  def resource_model
    Proposal
  end
end
