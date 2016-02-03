class SummaryMailer < ApplicationMailer
  def weekly(user, from = 1.week.ago, to = Time.now)
    @from = from
    @to = to
    @summary = ActivitySummary.new(user, @from, @to)
    @official_random_proposals = Proposal.where(official: true).order('random()').limit(5)
    @random_proposals = Proposal.order('random()').where(official: false).limit(5)
    @upcoming_meetings = Meeting.upcoming.limit(5)
    @user = user

    with_user(user) do
      mail(to: user.email, subject: t('summary_mailer.weekly.subject',
                                      from: I18n.l(@from.to_date), to: I18n.l(@to.to_date)))
    end
  end
end
