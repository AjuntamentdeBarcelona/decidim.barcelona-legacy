# Preview all emails at http://localhost:3000/rails/mailers/summary_mailer
class ProposalResultsMailerPreview < ActionMailer::Preview
  def authors_and_followers
    email = ProposalResultsMailer.user_summary(User.find(9025))
    email.message.send(:inline_styles)
    email
  end

  def interacting_user
    email = ProposalResultsMailer.user_summary(User.find(14095))
    email.message.send(:inline_styles)
    email
  end

  def non_interacting_user
    email = ProposalResultsMailer.user_summary(User.find(24282))
    email.message.send(:inline_styles)
    email
  end
end
