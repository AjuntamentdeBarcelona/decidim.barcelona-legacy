class Api::ApplicationController < ActionController::Base
  serialization_scope :view_context
  check_authorization

  rescue_from CanCan::AccessDenied do |exception|
    respond_to do |format|
      format.json { render json: {error: exception.message}, status: :forbidden }
    end
  end
end
