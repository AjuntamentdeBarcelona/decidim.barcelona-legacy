class ActionPlan < ActiveRecord::Base
  module Statistics
    extend ActiveSupport::Concern

    included do
      has_one :action_plan_statistics, class_name: ::ActionPlanStatistics

      scope :sort_by_confidence_score , -> { 
        includes(:action_plan_statistics).reorder('action_plan_statistics.supports_count desc') 
      }

      scope :sort_by_participants , -> { 
        includes(:action_plan_statistics).reorder('action_plan_statistics.participants_count desc') 
      }

      delegate :related_proposals_count, :supports_count, :comments_count, :participants_count,
        :meeting_interventions_count, :interventions_count,
        to: :action_plan_statistics, allow_nil: true

      def statistics
        {
          related_proposals_count: related_proposals_count,
          supports_count: supports_count,
          comments_count: comments_count,
          participants_count: participants_count,
          meeting_interventions_count: meeting_interventions_count,
          interventions_count: interventions_count
        }
      end

      def compute_statistics
        statistics = ActionPlanStatistics.find_or_create_by(action_plan_id: self.id)

        statistics.related_proposals_count     = compute_related_proposals_count
        statistics.supports_count              = compute_supports_count
        statistics.comments_count              = compute_comments_count
        statistics.participants_count          = compute_participants_count
        statistics.meeting_interventions_count = compute_meeting_interventions_count
        statistics.interventions_count         = compute_interventions_count

        statistics.save
      end

      private

      def compute_related_proposals_count
        self.proposals.count
      end

      def compute_supports_count
        self.proposals.map(&:total_votes).sum
      end

      def compute_comments_count
        self.proposals.map(&:comments).flatten.length
      end

      def compute_participants_count
        self.proposals.map(&:meetings).flatten.map(&:attendee_count).compact.sum
      end

      def compute_meeting_interventions_count
        self.proposals.map(&:meetings).flatten.map(&:interventions).compact.sum
      end

      def compute_interventions_count
        0
      end
    end
  end
end
