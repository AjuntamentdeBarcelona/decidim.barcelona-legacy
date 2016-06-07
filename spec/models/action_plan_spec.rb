require 'rails_helper'

RSpec.describe ActionPlan, type: :model do
  context "#statistics" do
    it "should retorn stastics as a hash object" do
      @action_plan = create(:action_plan)

      create(:action_plan_statistics, {
        action_plan: @action_plan,
        related_proposals_count: 1,
        supports_count: 2,
        comments_count: 3,
        participants_count: 4,
        meeting_interventions_count: 5,
        interventions_count: 6
      }) 

      @action_plan.reload

      expect(@action_plan.statistics).to eq({
        related_proposals_count: 1,
        supports_count: 2,
        comments_count: 3,
        participants_count: 4,
        meeting_interventions_count: 5,
        interventions_count: 6
      })
    end
  end
end
