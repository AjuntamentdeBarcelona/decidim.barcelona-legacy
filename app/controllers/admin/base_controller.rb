class Admin::BaseController < ApplicationController
  before_action :authenticate_user!

  layout "admin"

  skip_authorization_check
  before_action :verify_administrator

  private

    def verify_administrator
      raise CanCan::AccessDenied unless can?(:access_panel, :administration)
    end
end
