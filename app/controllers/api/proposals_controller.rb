class Api::ProposalsController < ApplicationController
  skip_authorization_check
  serialization_scope :view_context

  def index
    @proposals = ResourceFilter.new(params)
      .filter_collection(Proposal.all)
      .order(:created_at)
      .page(params[:page])
      .per(15)

    respond_to do |format|
      format.json { render json: @proposals }
    end
  end
end
