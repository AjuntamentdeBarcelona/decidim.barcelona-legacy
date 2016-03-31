class Api::ProposalsController < ApplicationController
  skip_authorization_check
  serialization_scope :view_context

  has_orders %w{random hot_score confidence_score created_at}, only: :index

  def index
    set_seed

    proposals = @current_order == "recommended" ? Recommender.new(current_user).proposals : Proposal.all

    @proposals = ResourceFilter.new(params)
      .filter_collection(proposals.includes(:category, :subcategory, :author => [:organization]))
      .send("sort_by_#{@current_order}")
      .page(params[:page])
      .per(15)

    respond_to do |format|
      format.json { 
        render json: @proposals, meta: {
          seed: @random_seed,
          current_page: @proposals.current_page,
          next_page: @proposals.next_page,
          prev_page: @proposals.prev_page,
          total_pages: @proposals.total_pages,
          total_count: @proposals.total_count
        }
      }
    end
  end

  private

  def set_seed
    @random_seed = params[:random_seed] ? params[:random_seed].to_f : (rand * 2 - 1)
    Proposal.connection.execute "select setseed(#{@random_seed})"
  end
end
