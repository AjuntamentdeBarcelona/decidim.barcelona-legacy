# Compute action plan statistics and store them into database
class ActionPlanStatisticsCalculator
  # Static
  #
  # Compute the following statistics for a given action plan:
  # - Related proposals count
  # - Supports count
  # - Comments count
  # - Participations count
  # - Meeting interventions count
  # - Interventions count
  #
  # ap - An action plan to compute statistics for
  def self.compute_statistics_for(ap)
    statistics = ActionPlanStatistics.find_or_create_by(action_plan_id: ap.id)

    statistics.related_proposals_count     = related_proposals_count(ap)
    statistics.supports_count              = supports_count(ap)
    statistics.comments_count              = comments_count(ap)
    statistics.participants_count          = participants_count(ap)
    statistics.meeting_interventions_count = meeting_interventions_count(ap)
    statistics.interventions_count         = interventions_count(ap)

    statistics.save
    statistics
  end

  # Static
  #
  # Count related proposals for a given action plan
  #
  # ap - An action plan to compute related proposals count for
  def self.related_proposals_count(ap)
    ap.proposals.count
  end

  # Static
  #
  # Count related proposals for a given action plan
  #
  # ap - An action plan to compute related proposals count for
  def self.supports_count(ap)
    ap.proposals.map(&:total_votes).sum
  end

  # Static
  #
  # Sum total comments for all action plan proposals
  #
  # ap - An action plan to compute comments count for
  def self.comments_count(ap)
    ap.proposals.map(&:comments).flatten.length
  end

  # Static
  #
  # Sum total attendees for all meetings related to an action plan
  #
  # ap - An action plan to compute participants count for
  def self.participants_count(ap)
    ap.proposals.map(&:meetings).flatten.map(&:attendee_count).compact.sum
  end

  # Static
  #
  # Sum total interventions for all meetings related to an action plan
  #
  # ap - An action plan to compute meeting interventions count for
  def self.meeting_interventions_count(ap)
    ap.proposals.map(&:meetings).flatten.map(&:interventions).compact.sum
  end

  # TODO: Just a placeholder. Needs a correct implementation.
  def self.interventions_count(ap)
    0
  end
end
