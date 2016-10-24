class DebateDecorator < ApplicationDecorator
  delegate_all

  def url
    h.debate_url(id: object)
  end
end
