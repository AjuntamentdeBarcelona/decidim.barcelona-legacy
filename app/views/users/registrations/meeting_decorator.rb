class MeetingDecorator < ApplicationDecorator
  delegate_all

  def url
    h.meeting_url(id: object)
  end
end
