class NewsletterMailer < ApplicationMailer
  def newsletter(user, newsletter)
    return unless user.newsletter

    @newsletter = newsletter.decorate

    Rails.logger.info "Sending newsletter to #{user.email}"

    with_user(user) do
      mail(to: user.email, subject: @newsletter.title)
    end
  end
end
