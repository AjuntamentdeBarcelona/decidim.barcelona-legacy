class PagesController < ApplicationController
  include HasParticipatoryProcess
  skip_authorization_check

  def show
    render action: params[:id]
  rescue ActionView::MissingTemplate
    raise ActionController::RoutingError.new('Not Found')
  end

end
