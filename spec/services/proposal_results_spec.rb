require 'rails_helper'

describe ProposalResults do
  let!(:user) { create(:user) }
  let!(:proposals) { create_list(:proposal, 5) }

  let(:proposal_results) { ProposalResults.new(user) }

  context "when there's no answers" do
    describe '#any?' do
      it 'returns false' do
        expect(proposal_results.any?).to eq(false)
      end
    end
  end

  context "when there's answers" do
    let!(:authored_proposals) { create_list(:proposal, 5, author: user) }
    let!(:authored_accepted_proposals) { authored_proposals[0..1] }
    let!(:authored_rejected_proposals) { authored_proposals[2..3] }
    let!(:authored_unanswered_proposals) { authored_proposals[4..5] }

    let!(:followed_proposals) { create_list(:proposal, 5) }
    let!(:followed_accepted_proposals) { followed_proposals[0..1] }
    let!(:followed_rejected_proposals) { followed_proposals[2..3] }
    let!(:followed_unanswered_proposals) { followed_proposals[4..5] }

    before do
      followed_proposals.each do |proposal|
        create(:follow, follower: user, following: proposal)
      end

      (authored_accepted_proposals + followed_accepted_proposals).each do |proposal|
        create(:proposal_answer, { proposal: proposal,
                                   status: 'accepted',
                                   message: 'It was accepted because of reasons' })
      end

      (authored_rejected_proposals + followed_rejected_proposals).each do |proposal| 
        create(:proposal_answer, { proposal: proposal,
                                   status: 'rejected',
                                   message: 'It was not accepted because of reasons' })
      end
    end

    describe '#any?' do
      it 'returns true' do
        expect(proposal_results.any?).to eq(true)
      end
    end

    describe(:authored_proposals) do
      it 'includes answered proposals authored by a user' do
        expect(proposal_results.authored_proposals).to include(*authored_accepted_proposals)
        expect(proposal_results.authored_proposals).to include(*authored_rejected_proposals)

        expect(proposal_results.authored_proposals).to_not include(*authored_unanswered_proposals)
      end
    end

    describe(:followed_proposals) do
      it 'includes answered proposals followed by a user' do
        expect(proposal_results.followed_proposals).to include(*followed_accepted_proposals)
        expect(proposal_results.followed_proposals).to include(*followed_accepted_proposals)

        expect(proposal_results.followed_proposals).to_not include(*followed_unanswered_proposals)
      end
    end
  end
end
