require 'rails_helper'

RSpec.describe ActionPlan, type: :model do
  context "statistics" do
    before :all do
      @meeting_1 = create(:meeting, attendee_count: 10, interventions: 2)
      @proposal_1 = create(:proposal)
      @proposal_1.meetings << @meeting_1
      @proposal_1.save
      2.times { create(:comment, commentable: @proposal_1) }
      3.times { create(:vote, votable: @proposal_1) }

      @meeting_1 = create(:meeting, attendee_count: 15, interventions: 5)
      @proposal_2 = create(:proposal)
      @proposal_2.meetings << @meeting_1
      @proposal_1.save
      4.times { create(:comment, commentable: @proposal_2) }
      5.times { create(:vote, votable: @proposal_2) }

      @action_plan = create(:action_plan)
      @action_plan.proposals << @proposal_1
      @action_plan.proposals << @proposal_2
      @action_plan.save

      @action_plan.compute_statistics
      @statistics = @action_plan.statistics
    end

    it "should compute related proposals count" do
      expect(@statistics[:related_proposals_count]).to eq(2)
    end

    it "should compute supports count" do
      expect(@statistics[:supports_count]).to eq(8)
    end

    it "should compute comments count" do
      expect(@statistics[:comments_count]).to eq(6)
    end

    it "should compute participants count" do
      expect(@statistics[:participants_count]).to eq(25)
    end

    it "should compute meeting interventions count" do
      expect(@statistics[:meeting_interventions_count]).to eq(7)
    end

    xit "should compute interventions count" do
      expect(@statistics[:interventions_count]).to eq(0)
    end
  end
end
