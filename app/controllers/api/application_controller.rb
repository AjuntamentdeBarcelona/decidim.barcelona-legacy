class Api::ApplicationController < ActionController::Base
  serialization_scope :view_context
  check_authorization
  respond_to :json

  before_filter :set_locale

  rescue_from CanCan::AccessDenied do |exception|
    respond_to do |format|
      format.json { render json: {error: exception.message}, status: :forbidden }
    end
  end

  private

  def set_locale
    locale = params[:locale] || session[:locale] || I18n.default_locale
    I18n.locale = locale
  end
end
