class Users::SessionsController < Devise::SessionsController
  layout "application"

  skip_before_action :ensure_signup_complete, only: [:destroy]

  def accept_new_terms
    current_user && current_user.update_attribute(:hide_new_terms, true)
    render nothing: true
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
