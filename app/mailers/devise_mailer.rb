class DeviseMailer < Devise::Mailer
  helper :application
  include Devise::Controllers::UrlHelpers
  default template_path: 'devise/mailer'

  before_filter do
    @hide_footer_link = true
  end

  protected

  def devise_mail(record, action, opts={})
    with_user(record) do
      super(record, action, opts)
    end
  end
end
