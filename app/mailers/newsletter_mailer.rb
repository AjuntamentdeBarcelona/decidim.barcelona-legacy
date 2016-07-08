class NewsletterMailer < ApplicationMailer
  def newsletter(user, newsletter)
    return unless user.newsletter
    Rails.logger.info "Sending newsletter to #{user.email}"

    with_user(user) do
      @newsletter = newsletter.decorate
      @body = @newsletter.body.gsub('%{name}', user.username || '')
      mail(to: user.email, subject: @newsletter.title)
    end
  end
end
