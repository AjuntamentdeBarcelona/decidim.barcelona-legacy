class Organizations::RegistrationsController < Devise::RegistrationsController

  layout "application"

  def new
    super do |user|
      user.build_organization
    end
  end

  def success
  end

  def create
    build_resource(sign_up_params)
    if verify_recaptcha(model: resource)
      super do |user|
        # Removes unuseful "organization is invalid" error message
        user.errors.messages.delete(:organization)
      end
    else
      render :new
    end
  end

  protected
    def after_inactive_sign_up_path_for(resource)
      organizations_sign_up_success_path
    end

  private

    def sign_up_params
      params.require(:user).permit(:email, :password, :phone_number,
                                   :password_confirmation, :terms_of_service,
                                   organization_attributes: [:name, :responsible_name, :document_number])
    end

end
