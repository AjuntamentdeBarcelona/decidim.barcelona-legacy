class ApplicationMailer < ActionMailer::Base
  include Roadie::Rails::Automatic

  default from: "Decidim Barcelona <#{Rails.application.secrets.email}>"
  layout 'mailer'

  before_filter :inline_attachments

  private

  def with_user(user, &block)
    I18n.with_locale(user.locale) do
      block.call
    end
  end

  def roadie_options
    super.merge(
      keep_uninlinable_css: false
    )
  end

  def inline_attachments
    attachments.inline["badge_ajuntament.png"] = File.read(Rails.root.join("app/assets/images/badge-ajuntament-footer.png"))
    attachments.inline["logo.svg"] = File.read(Rails.root.join("app/assets/images/decidim-logo.png"))
  end
end
