class Users::RegistrationsController < Devise::RegistrationsController
  layout "application"

  prepend_before_action :authenticate_scope!, only: [:edit, :update, :destroy, :finish_signup, :do_finish_signup]

  def create
    build_resource(sign_up_params.merge(hide_new_terms: true))

    if verify_recaptcha(model: resource)
      super
    else
      render :new
    end
  end

  def delete_form
    build_resource({})
  end

  def delete
    current_user.erase(erase_params[:erase_reason])
    sign_out
    redirect_to root_url, notice: t("devise.registrations.destroyed")
  end

  def success
  end

  def finish_signup
    current_user.registering_with_oauth = false
    current_user.email = current_user.oauth_email if current_user.email.blank?
    current_user.validate
  end

  def do_finish_signup
    current_user.registering_with_oauth = false
    current_user.hide_new_terms = true

    if current_user.update(sign_up_params)
      current_user.send_oauth_confirmation_instructions
      sign_in_and_redirect current_user, event: :authentication
    else
      render :finish_signup
    end
  end

  def check_username
    if User.find_by_username params[:username]
      render json: {available: false, message: t("devise_views.users.registrations.new.username_is_not_available")}
    else
      render json: {available: true, message: t("devise_views.users.registrations.new.username_is_available")}
    end
  end

  private

    def sign_up_params
      sign_up_params = params.require(:user).permit(:username, :email, :password,
                                                    :password_confirmation, :newsletter,
                                                    :notifications_by_default,
                                                    :terms_of_service, :locale).to_hash

      if sign_up_params["notifications_by_default"] == "1"
        sign_up_params["weekly_summary"] = true
        sign_up_params["email_on_comment"] = true
        sign_up_params["email_on_comment_reply"] = true
      end

      sign_up_params
    end

    def erase_params
      params.require(:user).permit(:erase_reason)
    end

    def after_inactive_sign_up_path_for(resource_or_scope)
      users_sign_up_success_path
    end

end
