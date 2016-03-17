class Api::ProposalsController < ApplicationController
  skip_authorization_check

  def index
    @proposals = ResourceFilter.new(params)
      .filter_collection(Proposal.all)
      .page(params[:page])
      .per(15)

    respond_to do |format|
      format.json { render json: @proposals }
    end
  end
end
