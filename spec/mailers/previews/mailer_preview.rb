class MailerPreview < ActionMailer::Preview
  def comment
    email = Mailer.comment(Comment.first)
    email.message.send(:inline_styles)
    email
  end

  def confirmation
    email = DeviseMailer.confirmation_instructions(User.first, "BLAH")
    email.message.send(:inline_styles)
    email
  end
end
