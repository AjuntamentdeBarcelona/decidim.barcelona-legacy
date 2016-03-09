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
    attachments.inline['logo.png'] = File.read(Rails.root.join('app/assets/images/newsletter/logo.png'))
    attachments.inline['header.jpg'] = File.read(Rails.root.join('app/assets/images/newsletter/header.jpg'))
    true
  end

  def roadie_options
    super.merge(
      keep_uninlinable_css: false
    )
  end
end
