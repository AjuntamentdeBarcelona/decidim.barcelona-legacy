class DatavizController < ApplicationController
  skip_authorization_check
  helper_method :available_dataviz

  layout "participatory_process", only: [:show]

  def index
    redirect_to action: :show, id: available_dataviz.first
  end

  def show
    @id = params[:id]
    raise ActiveRecord::RecordNotFound unless available_dataviz.include?(@id)
  end

  private

  def available_dataviz
    %w(summary total_interactions proposals action_plans meetings map open_data)
  end
end
