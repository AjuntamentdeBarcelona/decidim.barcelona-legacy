# coding: utf-8
class Api::ProposalsController < Api::ApplicationController
  include HasOrders

  before_action :authenticate_user!, only: [:update, :hide, :flag, :unflag]

  load_resource
  authorize_resource except: [:update, :references, :action_plans]

  has_orders %w{random hot_score confidence_score created_at}, only: :index

  def index
    set_seed

    proposals = @current_order == "recommended" ? Recommender.new(current_user).proposals : Proposal.all

    @proposals = ResourceFilter.new(params, user: current_user)
      .filter_collection(proposals.includes(:category, :subcategory, :author))
      .send("sort_by_#{@current_order}")

    respond_to do |format|
      format.json { 
        proposals = @proposals.page(params[:page]).per(15)

        render json: proposals, meta: {
          seed: @random_seed,
          current_page: proposals.current_page,
          next_page: proposals.next_page,
          prev_page: proposals.prev_page,
          total_pages: proposals.total_pages,
          total_count: proposals.total_count
        }
      }

      format.csv do
        send_data report(@proposals), disposition: 'inline', filename: 'proposals.csv'
      end
    end
  end

  def show
    render json: @proposal
  end

  def update
    authorize! :review, @proposal
    @proposal.assign_attributes(strong_params)
    @proposal.save
    render json: @proposal
  end

  def references
    @references = Reference.references_for(@proposal)
    authorize! :read, @proposal
    render json: @references
  end

  def action_plans
    authorize! :read, ActionPlan
    render json: @proposal.action_plans, root: "action_plans"
  rescue CanCan::AccessDenied
    render json: []
  end

  def hide
    @proposal.hide
    Activity.log(current_user, :hide, @proposal)
    render json: @proposal
  end

  def flag
    Flag.flag(current_user, @proposal)
    render json: @proposal
  end

  def unflag
    Flag.unflag(current_user, @proposal)
    render json: @proposal
  end

  private

  def report(proposals)
    last_timestamp = proposals.order('updated_at desc').last.updated_at.to_i
    proposals = ProposalDecorator.decorate_collection(proposals)

    Rails.cache.fetch("proposals-csv-#{request.fullpath}-#{last_timestamp}") do
      CSV.generate do |csv|
        csv << [
          "Proposal ID",
          "Origen",
          "Àmbit",
          "Districte",
          "Categoria",
          "Subcategoria",
          "Títol",
          "Descripció",
          "Autor",
          "Data de creació",
          "Vots",
          "Comentaris",
          "URL"
        ]

        proposals.each do |proposal|
          csv << [
            proposal.id,
            translate_source(proposal.origin),
            proposal.scope,
            proposal.district_name,
            proposal.category.try(:name).try(:[], I18n.locale.to_s),
            proposal.subcategory.try(:name).try(:[], I18n.locale.to_s),
            proposal.title,
            proposal.summary,
            proposal.author.username,
            proposal.created_at,
            proposal.cached_votes_up,
            proposal.comments_count,
            url_for(proposal)
          ]
        end
      end
    end
  end

  def translate_source(source)
    {
      'meeting' => 'Cita presencial',
      'official' => 'Ajuntament',
      'organization' => 'Organització',
      'citizen' => 'Ciutadania'
    }[source.to_s]
  end

  def strong_params
    permitted_params = [:scope, :district, :category_id, :subcategory_id]
    params.require(:proposal).permit(permitted_params)
  end

  def set_seed
    @random_seed = params[:random_seed] ? params[:random_seed].to_f : (rand * 2 - 1)
    Proposal.connection.execute "select setseed(#{@random_seed})"
  end
end
