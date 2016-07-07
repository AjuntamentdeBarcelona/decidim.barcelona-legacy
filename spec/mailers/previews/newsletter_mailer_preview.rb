class NewsletterMailerPreview < ActionMailer::Preview
  def newsletter
    email = NewsletterMailer.newsletter(User.where(newsletter: true).last, Newsletter.first)
    email.message.send(:inline_styles)
    email
  end
end
