require 'rails_helper'

describe ProposalResultsMailer do
  describe '#user_summary' do
    let(:user) { create(:user) }
    let!(:authored_accepted_proposal) {
      answer = build(:proposal_answer, status: 'accepted', message: "Reason 1.")
      create(:proposal, author: user, answer: answer)
    }

    let!(:authored_rejected_proposal) {
      answer = build(:proposal_answer, status: 'rejected', message: "Reason 2")
      create(:proposal, author: user, answer: answer)
    }

    let!(:followed_accepted_proposal) {
      answer = build(:proposal_answer, status: 'accepted', message: "Reason 3")
      create(:proposal, author: user, answer: answer).tap do |proposal|
        Follow.create(follower: user, following: proposal)
      end
    }

    let!(:followed_rejected_proposal) {
      answer = build(:proposal_answer, status: 'rejected', message: "Reason 4")
      create(:proposal, author: user, answer: answer).tap do |proposal|
        Follow.create(follower: user, following: proposal)
      end
    }

    it 'renders proposals and their answers' do
      email = ProposalResultsMailer.user_summary(user)
      content = mail_content(email)

      expect(content).to include('Reason 2', 'Reason 4')
      expect(content).to_not include('Reason 1', 'Reason 3')
    end
  end
end
