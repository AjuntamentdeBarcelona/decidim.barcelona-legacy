require 'rails_helper'

module Recommendations
  describe ProposalScale do
    before :each do
      @proposal = create(:proposal)
    end

    describe "#object_id" do
      it "should return the proposal" do
        scale = ProposalScale.new @proposal
        expect(scale.object_id).to eq(@proposal.id)
      end
    end

    describe "#weights" do
      it "should return default weights if initialized without params" do
        scale = ProposalScale.new @proposal
        expect(scale.weights).to eq({ 
          created: ProposalScale::DEFAULT_CREATED_WEIGHT,
          voted: ProposalScale::DEFAULT_VOTED_WEIGHT,
          positive_comment: ProposalScale::DEFAULT_POSITIVE_COMMENT_WEIGHT,
          negative_comment: ProposalScale::DEFAULT_NEGATIVE_COMMENT_WEIGHT
        })
      end

      it "should return the correct values if initialized with params" do
        scale = ProposalScale.new @proposal, created: 10, voted: 8
        expect(scale.weights[:created]).to eq(10)
        expect(scale.weights[:voted]).to eq(8)
      end
    end

    describe "#weight_for" do
      before :each do
        @user = create(:user)
      end

      it "should return the correct weight" do
        create(:vote, voter: @user, votable: @proposal)
        scale = ProposalScale.new @proposal

        expect(scale.weight_for(@user.id)).to eq(ProposalScale::DEFAULT_VOTED_WEIGHT)
      end

      it "should accumulate different weights" do
        create(:comment, commentable: @proposal, alignment: -1, user: @user)
        create(:comment, commentable: @proposal, alignment: 1, user: @user)
        scale = ProposalScale.new @proposal

        expect(scale.weight_for(@user.id)).to eq(ProposalScale::DEFAULT_POSITIVE_COMMENT_WEIGHT + 
                                              ProposalScale::DEFAULT_NEGATIVE_COMMENT_WEIGHT)
      end
    end
  end
end
