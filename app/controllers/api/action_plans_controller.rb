# coding: utf-8
class Api::ActionPlansController < Api::ApplicationController
  include HasOrders
  include ActionView::Helpers::SanitizeHelper

  load_and_authorize_resource

  has_orders %w{weight random confidence_score participants}, only: :index

  def index
    set_seed

    action_plans = ActionPlan.includes(:revisions, :action_plan_statistics)

    @action_plans = ResourceFilter.new(params, user: current_user)
      .filter_collection(action_plans.includes(:category, :subcategory))

    respond_to do |format|
      format.json { 
        action_plans = @action_plans
          .send("sort_by_#{@current_order}")
          .page(params[:page])
          .per(15)

        render json: action_plans, meta: {
          seed: @random_seed,
          current_page: action_plans.current_page,
          next_page: action_plans.next_page,
          prev_page: action_plans.prev_page,
          total_pages: action_plans.total_pages,
          total_count: action_plans.total_count
        }
      }

      format.xls do
        send_data report(@action_plans), disposition: 'inline', filename: 'action_plans.xls'
      end
    end
  end

  def update
    @action_plan = ActionPlan.find(params[:id])
    @action_plan.assign_attributes(strong_params)
    @action_plan.save!
    render json: @action_plan
  end

  def destroy
    @action_plan = ActionPlan.find(params[:id])
    @action_plan.destroy!
    render nothing: true
  end

  def show
    render json: @action_plan
  end

  private

  def strong_params
    permitted_params = []
    permitted_params += [:approved] if can?(:approve, ActionPlan)
    permitted_params += [:scope, :district, :category_id, :subcategory_id, :weight] if can?(:manage, ActionPlan)
    params.require(:action_plan).permit(permitted_params)
  end

  def set_seed
    @random_seed = params[:random_seed] ? params[:random_seed].to_f : (rand * 2 - 1)
    ActionPlan.connection.execute "select setseed(#{@random_seed})"
  end


  def report(action_plans)
    package = Axlsx::Package.new do |p|
      p.workbook.add_worksheet(name: 'Action Plans') do |sheet|
        sheet.add_row %w(ID Origen Aprovació Districte Categoria Subcategoria
                         Títol Descripció URL)

        action_plans.each do |action_plan|
          sheet.add_row [
            action_plan.id,
            action_plan.official ? 'Ajuntament' : 'Ciutadania',
            action_plan.approved ? 'aprovat' : nil,
            action_plan.scope == 'district' ? District.find(action_plan.district).try(:name) : nil,
            action_plan.category.name[I18n.default_locale.to_s],
            action_plan.subcategory.name[I18n.default_locale.to_s],
            action_plan.title,
            strip_tags(action_plan.description),
            url_for(action_plan)
          ]
        end
      end
    end

    package.to_stream.read
  end

  def translate_source(source)
    {
      'meeting' => 'Cita presencial',
      'official' => 'Ajuntament',
      'organization' => 'Organització',
      'citizen' => 'Ciutadania'
    }[source.to_s]
  end
end
