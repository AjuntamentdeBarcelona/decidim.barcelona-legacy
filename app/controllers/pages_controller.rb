class PagesController < ApplicationController
  include HasParticipatoryProcess
  skip_authorization_check
  helper_method :categories

  def show
    render action: params[:id]
  rescue ActionView::MissingTemplate
    raise ActionController::RoutingError.new('Not Found')
  end

  private

  def categories
    @categories ||= @participatory_process.categories.order(:position).decorate
  end
end
