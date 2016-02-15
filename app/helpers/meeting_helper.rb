module MeetingHelper
  def meeting_time(meeting)
    [meeting.start_at, meeting.end_at].compact.map{ |time| I18n.l time}.join(" - ")
  end
end
