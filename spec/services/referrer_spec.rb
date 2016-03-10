require 'rails_helper'

describe Referrer do
  let(:referrer){ Referrer.new(comment, comment.commentable) }

  let!(:comment){ create(:comment, body: body) }
  let(:subject){ comment.commentable }

  let(:body) {
    "This contains an invalid reference to http://example.com/proposals/fake and http://example.com/debates/fake-id but an valid reference to http://example.com/proposals/existing-proposal and http://example.com/debates/existing-debate"
  }

  let!(:proposal){ create(:proposal, title: "Existing Proposal") }
  let!(:debate){ create(:debate, title: "Existing Debate") }

  describe "references" do
    it "finds valid references" do
      expect(referrer.references(body)).to include(proposal, debate)
      expect(referrer.references(body).length).to eq(2)
    end
  end

  describe "#reference!" do
    before do
      referrer.reference!(body)
    end

    context "for the subject" do
      it "creates references" do
        references = Reference.references_for(subject)

        expect(references).to include(proposal)
        expect(references).to include(debate)
        expect(references).to_not include(subject)
      end
    end

    context "for a particular proposal" do
      it "creates references" do
        references = Reference.references_for(proposal)

        expect(references).to include(subject)
        expect(references).to_not include(debate)
        expect(references).to_not include(proposal)
      end
    end
  end

  describe "#dereference!" do
    before do
      referrer.reference!(body)
    end

    context "for the subject" do
      it "destroys its references" do
        referrer.dereference!
        expect(Reference.references_for(subject)).to be_empty
      end
    end
  end
end
