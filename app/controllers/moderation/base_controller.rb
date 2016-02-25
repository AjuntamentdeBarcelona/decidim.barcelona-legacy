class Moderation::BaseController < ApplicationController
  layout 'admin'

  before_action :authenticate_user!
  before_action :verify_moderator

  skip_authorization_check

  private

    def verify_moderator
      raise CanCan::AccessDenied unless can? :access_panel, :moderation
    end

end
