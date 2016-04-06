require 'rails_helper'

describe ActivitySummary do
  let(:user) { create(:user) }
  let(:since) { 7.days.ago }
  let(:subject) { described_class.new(user, since, DateTime.tomorrow) }

  before do
    allow(ProposalScoreCalculatorWorker).
      to receive(:perform_async).with(anything).and_return true
  end

  describe "#most_active_proposals" do
    let!(:past_proposals){ create_list(:proposal, 3, updated_at: 30.days.ago) }
    let!(:hot_proposals){ create_list(:proposal, 3) }
    let!(:inactive_proposals){ create_list(:proposal, 3) }

    before do
      hot_proposals.each{ |p| p.vote_by(voter: create(:user)) }
    end

    it "includes the most active" do
      expect(subject.most_active(3)).to include(*hot_proposals)
    end
  end

  describe "#own_active_proposals" do
    let!(:own_hot_proposals){ create_list(:proposal, 3, author: user) }
    let!(:own_proposals){ create_list(:proposal, 3, author: user) }
    let!(:hot_proposals){ create_list(:proposal, 3) }
    let!(:past_proposals){ create_list(:proposal, 3, updated_at: 30.days.ago) }

    before do
      own_hot_proposals.each{ |p| p.vote_by(voter: create(:user)) }
    end

    before do
      hot_proposals.each{ |p| p.vote_by(voter: create(:user)) }
    end

    it "includes the user's proposals" do
      expect(subject.own_active(3)).to include(*own_hot_proposals)
    end
  end

  describe "#latest_comments" do
    let!(:own_proposal) { create(:proposal, author: user) }
    let!(:proposal) { create(:proposal) }

    let!(:past_comments_on_proposals) do
      create_list(:comment, 3, updated_at: 3.days.ago)
    end

    let!(:recent_comments_on_own_proposals) do
      create_list(:comment, 3, commentable: own_proposal, updated_at: 3.days.ago)
    end

    let!(:past_comments_on_own_proposals) do
      create_list(:comment, 3, commentable: own_proposal, updated_at: 5.days.ago)
    end

    it "includes latest comments in your proposals" do
      expect(subject.recent_comments_on_own_proposals(3)).to include(*recent_comments_on_own_proposals)
    end
  end

  describe "#most_active_voted" do
    let!(:proposals) { create_list(:proposal, 3) }
    let!(:voted_proposals) { create_list(:proposal, 3) }

    before do
      proposals.each{ |p| p.vote_by(voter: create(:user)) }
    end

    before do
      voted_proposals.each{ |proposal| user.likes proposal }
    end

    it "includes latest comments in your proposals" do
      expect(subject.most_active_voted(3)).to include(*voted_proposals)
    end
  end

  describe "#votes_count" do
    let(:user2){ create(:user) }
    let(:user3){ create(:user) }
    let(:user4){ create(:user) }
    let(:proposal) { create(:proposal) }

    it "returns the amount of votes a proposal received during a time period" do
      Timecop.freeze(15.days.ago) do
        user2.likes proposal
      end

      user3.likes proposal
      user4.likes proposal

      expect(subject.votes_count(proposal)).to eq(2)
    end
  end

  describe "#comments_count" do
    let(:proposal) { create(:proposal) }

    it "returns the amount of votes a proposal received during a time period" do
      Timecop.freeze(15.days.ago) do
        create(:comment, commentable: proposal)
      end

      create_list(:comment, 2, commentable: proposal)

      expect(subject.comments_count(proposal)).to eq(2)
    end
  end
end
