class PagesController < ApplicationController
  skip_authorization_check
  helper_method :categories

  layout :resolve_layout

  def show
    render action: params[:id]
  rescue ActionView::MissingTemplate
    raise ActionController::RoutingError.new('Not Found')
  end

  private

  def categories
    @categories ||= @participatory_process.categories.order(:position).decorate
  end

  def resolve_layout
    params[:id] == 'more_information' ? "participatory_process" : "application"
  end
end
