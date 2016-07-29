require 'rails_helper'

describe ProposalResultsMailer do
  describe '#user_summary' do
    let(:user) { create(:user) }
    let!(:authored_accepted_proposal) do
      answer = build(:proposal_answer, status: 'accepted')
      create(:proposal, author: user, answer: answer, title: 'Proposal 1.')
    end

    let!(:authored_rejected_proposal) do
      answer = build(:proposal_answer, status: 'rejected')
      create(:proposal, author: user, answer: answer, title: 'Proposal 2')
    end

    let!(:followed_accepted_proposal) do
      answer = build(:proposal_answer, status: 'accepted')
      create(:proposal, author: user, answer: answer, title: 'Proposal 3').tap do |proposal|
        Follow.create(follower: user, following: proposal)
      end
    end

    let!(:followed_rejected_proposal) do
      answer = build(:proposal_answer, status: 'rejected')
      create(:proposal, author: user, answer: answer, title: 'Proposal 4').tap do |proposal|
        Follow.create(follower: user, following: proposal)
      end
    end

    let!(:random_proposal) { create(:proposal, title: 'Proposal 5') }

    it 'renders proposals and their answers' do
      email = ProposalResultsMailer.user_summary(user)
      content = mail_content(email)

      expect(content).to include('Proposal 1', 'Proposal 2', 'Proposal 3', 'Proposal 4')
      expect(content).to_not include('Proposal 5')
    end
  end
end
