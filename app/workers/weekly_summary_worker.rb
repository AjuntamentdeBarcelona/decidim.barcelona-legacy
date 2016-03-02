class WeeklySummaryWorker
  include Sidekiq::Worker

  def perform
    from = 1.week.ago
    to = Time.now

    User.where(weekly_summary: true).find_each do |user|
      SummaryMailer.weekly(user, from, to).deliver_later
    end

    time = Time.now.next_week(:monday).to_datetime.change({ hour: 7, min: 30, sec: 0 })
    self.class.perform_at(time)
  end
end
