class Revision::BaseController < ApplicationController
  layout 'admin'

  before_action :authenticate_user!
  before_action :verify_reviewer

  skip_authorization_check

  private

    def verify_reviewer
      raise CanCan::AccessDenied unless can? :access_panel, :revision
    end

end
