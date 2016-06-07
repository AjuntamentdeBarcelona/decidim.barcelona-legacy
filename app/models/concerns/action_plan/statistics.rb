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
    end
  end
end
