# Preview all emails at http://localhost:3000/rails/mailers/summary_mailer
class ProposalResultsMailerPreview < ActionMailer::Preview
  def user
    email = ProposalResultsMailer.user_summary(User.find(23905))
    email.message.send(:inline_styles)
    email
  end
end
