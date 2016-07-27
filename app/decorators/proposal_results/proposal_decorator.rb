class ProposalResults::ProposalDecorator < ApplicationDecorator
  delegate :title, :action_plans

  def message
    answer.message if rejected?
  end

  def accepted?
    answer.status == 'accepted'
  end

  def rejected?
    answer.status == 'rejected'
  end

  def linked_title
    h.link_to(title, object)
  end

  def votes
    object.cached_votes_up
  end

  private

  def answer
    object.answer
  end
end
