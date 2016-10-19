class Admin::BaseController < ApplicationController
  layout 'admin'
  before_action :authenticate_user!

  skip_authorization_check
  before_action :verify_administrator

  private

  def verify_administrator
    raise CanCan::AccessDenied unless can?(:access_panel, :administration)
  end

  def admin_section?
    true
  end
end
