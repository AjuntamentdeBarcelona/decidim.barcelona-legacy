class WeeklySummaryWorker
  include Sidekiq::Worker
  sidekiq_options retry: false, backtrace: true

  def perform
    User.where(weekly_summary: true).where('email is not null').find_each do |user|
      SummaryMailer.weekly(user).deliver_later
    end

    time = Time.now.next_week(:monday).to_datetime.change({ hour: 7, min: 30, sec: 0 })
    self.class.perform_at(time)
  end
end
