# Preview all emails at http://localhost:3000/rails/mailers/summary_mailer
class SummaryPreview < ActionMailer::Preview
  def weekly
    email = SummaryMailer.weekly(User.last)
    email.message.send(:inline_styles)
    email
  end
end
