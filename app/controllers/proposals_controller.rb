class ProposalsController < ApplicationController
  FEATURED_PROPOSALS_LIMIT = 3
  include CommentableActions
  include FlagActions

  before_action :set_search_order, only: [:index]
  before_action :authenticate_user!, except: [:index, :show]

  has_orders %w{random hot_score confidence_score created_at relevance}, only: :index
  has_orders %w{most_voted newest oldest}, only: :show
  has_orders %w{recommended},
             if: proc { current_user && can?(:see_recommendations, Proposal) && current_user.recommended_proposals.any? },
             only: :index

  load_and_authorize_resource
  respond_to :html, :js

  def index
    @filter = ResourceFilter.new(params)
    proposals = @current_order == "recommended" ? Recommender.new(current_user).proposals : Proposal.all

    proposals = @filter.filter_collection(proposals.includes(:category, :subcategory, :author => [:organization]))

    if Setting["feature.proposal_tags"]
      @tag_cloud = @filter.tag_cloud(proposals)
    end

    proposals = proposals.includes(:author)

    if @current_order != "recommended"
      proposals = proposals.send("sort_by_#{@current_order}")
    end

    set_resource_votes(proposals)

    respond_to do |format|
      format.any(:html, :js) do
        ActiveRecord::Base.transaction do
          set_seed
          @proposals = proposals.
                       page(params[:page]).
                       per(15).
                       for_render.
                       all
        end
      end

      if can?(:download_report, Proposal)
        format.xls do
          send_data report(proposals), disposition: 'inline', filename: 'proposals.xls'
        end
      end
    end
  end

  def vote
    @proposal.register_vote(current_user, 'yes')
    set_proposal_votes(@proposal)
  end

  private

    def proposal_params
      permitted_params = [:title, :question, :summary, :description, :external_url, :video_url, :responsible_name, :tag_list, :category_id, :subcategory_id, :scope, :district]

      if can?(:mark_as_official, Proposal)
        permitted_params << :official
      end

      if can?(:manage, Meeting)
        permitted_params << :from_meeting
      end

      params.require(:proposal).permit(permitted_params)
    end

    def resource_model
      Proposal
    end

    def report(proposals)
      package = Axlsx::Package.new do |p|
        p.workbook.add_worksheet(:name => "Proposals") do |sheet|
          sheet.add_row [
            "Proposal ID",
            "District",
            "Category",
            "Subcategory",
            "Title",
            "Description",
            "Author ID",
            "Author Username",
            "Created at",
            "Votes",
            "Comments",
            "URL"
          ]

          proposals.each do |proposal|
            row = []
            row.push proposal.id
            row.push proposal.district_object.try(:name)
            row.push proposal.category.try(:name).try(:[], I18n.locale.to_s)
            row.push proposal.subcategory.try(:name).try(:[], I18n.locale.to_s)
            row.push proposal.title
            row.push proposal.summary
            row.push proposal.author.id
            row.push proposal.author.username
            row.push proposal.created_at
            row.push proposal.cached_votes_up
            row.push proposal.comments_count
            row.push url_for(proposal)
            sheet.add_row row
          end
        end
      end

      package.to_stream.read
    end

    def set_seed
      @random_seed = params[:random_seed] ? params[:random_seed].to_f : (rand * 2 - 1)
      Proposal.connection.execute "select setseed(#{@random_seed})"
    end
end
