class PagesController < ApplicationController
  skip_authorization_check
  helper_method :categories

  def show
    render action: params[:id]
  rescue ActionView::MissingTemplate
    raise ActionController::RoutingError.new('Not Found')
  end

  private

  def categories
    @categories ||= Category.order(:position).decorate
  end
end
