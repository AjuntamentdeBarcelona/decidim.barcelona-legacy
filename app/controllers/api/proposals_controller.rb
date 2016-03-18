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
      format.json { 
        render json: @proposals, meta: {
          current_page: @proposals.current_page,
          next_page: @proposals.next_page,
          prev_page: @proposals.prev_page,
          total_pages: @proposals.total_pages,
          total_count: @proposals.total_count
        }
      }
    end
  end
end
