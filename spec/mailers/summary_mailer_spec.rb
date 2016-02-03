require "rails_helper"

RSpec.describe SummaryMailer, type: :mailer do
  describe "weekly" do
    it "sends a weekly report" do
      user = create(:user)
      proposals = create_list(:proposal, 4)
      past_meetings = create_list(:meeting, 3, held_at: Date.yesterday)
      upcoming_meetings = create_list(:meeting, 3, held_at: Date.tomorrow)

      mail = SummaryMailer.weekly(user)
      mail.deliver_now

      last_email = ActionMailer::Base.deliveries.last
      expect(mail_content(last_email)).to include(*proposals.map(&:title))
      expect(mail_content(last_email)).to include(*upcoming_meetings.map(&:title))
      expect(mail_content(last_email)).to_not include(*past_meetings.map(&:title))
    end
  end
end
