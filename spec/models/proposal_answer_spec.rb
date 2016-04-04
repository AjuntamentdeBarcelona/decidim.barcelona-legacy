require 'rails_helper'

describe ProposalAnswer do
  let(:proposal_answer) { build(:proposal_answer) }

  it "should be valid" do
    expect(proposal_answer).to be_valid
  end

  it "should not be valid without a proposal" do
    proposal_answer.proposal = nil
    expect(proposal_answer).to_not be_valid
  end

  it "should not be valid with a status different of 'accepted' or 'rejected'" do
    {
      nil => false,
      'accepted' => true,
      'rejected' => true,
      'completed' => false
    }.each do |status, is_valid|
      proposal_answer.status = status
      expect(proposal_answer.valid?).to be(is_valid), "proposal answer with status #{status}"
    end
  end
end
