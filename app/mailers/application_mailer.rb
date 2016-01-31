class ApplicationMailer < ActionMailer::Base
  include Roadie::Rails::Automatic

  default from: "Decidim Barcelona <#{Rails.application.secrets.email}>"
  layout 'mailer'

  before_filter :inline_logo

  private

  def with_user(user, &block)
    I18n.with_locale(user.locale) do
      block.call
    end
  end

  def inline_logo
    attachments.inline['logo.png'] = File.read(Rails.root.join('app/assets/images/decidim-logo.png'))
    true
  end
end
