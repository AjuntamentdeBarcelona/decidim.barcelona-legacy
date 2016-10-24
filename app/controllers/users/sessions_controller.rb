class Users::SessionsController < Devise::SessionsController
  layout "application"

  skip_before_action :ensure_signup_complete, only: [:destroy]

  def create
    super do |resource|
      if !resource.new_terms_shown
        flash[:alert] = I18n.t("devise.sessions.new_terms", url: page_path("conditions")).html_safe
        resource.update_attribute(:new_terms_shown, true)
      end
    end
  end

  private

    def after_sign_in_path_for(resource)
      if !verifying_via_email? && resource.show_welcome_screen?
        welcome_path
      else
        super
      end
    end

    def after_sign_out_path_for(resource)
      request.referrer.present? ? request.referrer : super
    end

    def verifying_via_email?
      return false unless resource.present?
      stored_path = session[stored_location_key_for(resource)] || ""
      stored_path[0..5] == "/email"
    end

end
