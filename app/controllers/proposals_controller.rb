class ProposalsController < ApplicationController
  FEATURED_PROPOSALS_LIMIT = 3
  include CommentableActions
  include FlagActions

  before_action :set_search_order, only: [:index]
  before_action :authenticate_user!, except: [:index, :show]

  has_orders %w{hot_score confidence_score created_at relevance}, only: :index
  has_orders %w{most_voted newest oldest}, only: :show
  has_orders %w{recommended},
             if: proc { current_user && current_user.recommended_proposals.any? },
             only: :index

  load_and_authorize_resource
  respond_to :html, :js

  def index
    @filter = ResourceFilter.new(params)
    @proposals = @current_order == "recommended" ? current_user.recommended_proposals : Proposal

    @proposals = @filter.filter_collection(@proposals.includes(:category, :subcategory, :author => [:organization]))

    if Setting["feature.proposal_tags"]
      @tag_cloud = @filter.tag_cloud(@proposals)
    end

    unless @current_order == "recommended"
      @featured_proposals = @proposals.sort_by_confidence_score.limit(FEATURED_PROPOSALS_LIMIT) if (@filter.search_filter.blank? && @filter.tag_filter.blank?)
      if @featured_proposals.present?
        set_featured_proposal_votes(@featured_proposals)
        @featured_proposals = @featured_proposals.send("sort_by_#{@current_order}")
      end
    end

    @proposals = @proposals.
                 page(params[:page]).
                 per(15).
                 for_render.
                 includes(:author)

    if @current_order == "recommended"
      @proposals = @proposals.order("recommendations.score / (proposals.cached_votes_up + 1) desc")
    else
      @proposals = @proposals.send("sort_by_#{@current_order}")
    end

    set_resource_votes(@proposals)
  end

  def vote
    @proposal.register_vote(current_user, 'yes')
    set_proposal_votes(@proposal)
  end

  def vote_featured
    @proposal.register_vote(current_user, 'yes')
    set_featured_proposal_votes(@proposal)
  end

  private

    def proposal_params
      permitted_params = [:title, :question, :summary, :description, :external_url, :video_url, :responsible_name, :tag_list, :captcha, :captcha_key, :category_id, :subcategory_id, :scope, :district]

      if current_user.administrator?
        permitted_params << :official
      end

      params.require(:proposal).permit(permitted_params)
    end

    def resource_model
      Proposal
    end

    def set_featured_proposal_votes(proposals)
      @featured_proposals_votes = current_user ? current_user.proposal_votes(proposals) : {}
    end

end
