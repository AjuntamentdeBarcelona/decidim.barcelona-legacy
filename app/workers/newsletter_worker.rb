class NewsletterWorker
  include Sidekiq::Worker

  def perform(newsletter_id)
    newsletter = Newsletter.find(newsletter_id)
    user_scope = User.all

    newsletter.with_lock do
      break if newsletter.sent?

      user_scope.where.not(email: nil).where(newsletter: true).find_each do |user|
        UserWorker.perform_async(user.id, newsletter.id)
      end

      newsletter.update_attributes(sent_at: Time.now)
    end
  end

  class UserWorker
    include Sidekiq::Worker

    def perform(user_id, newsletter_id)
      user = User.find(user_id)
      newsletter = Newsletter.find(newsletter_id)

      NewsletterMailer.newsletter(user, newsletter).deliver_later
    end
  end
end
