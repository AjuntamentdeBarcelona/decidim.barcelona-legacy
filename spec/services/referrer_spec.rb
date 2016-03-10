require 'rails_helper'

describe Referrer do
  let!(:comment){ create(:comment, body: body) }
  let(:subject){ comment.commentable }
  let(:referrer){ Referrer.new(comment) }

  let(:body) {
    "This contains an invalid reference to http://example.com/proposals/fake and http://example.com/debates/fake-id but an valid reference to http://example.com/proposals/existing-proposal and http://example.com/debates/existing-debate"
  }

  let!(:proposal){ create(:proposal, title: "Existing Proposal") }
  let!(:debate){ create(:debate, title: "Existing Debate") }

  describe "references" do
    it "finds valid references" do
      expect(referrer.references).to include(proposal, debate)
      expect(referrer.references.length).to eq(2)
    end
  end

  describe "reference!" do
    it "creates references on the database" do
      referrer.reference!

      expect(Reference.where(comment: comment, referenced: proposal)).to exist
      expect(Reference.where(comment: comment, referenced: debate)).to exist
    end
  end

  describe "#references_for" do
    before do
      referrer.reference!
    end

    context "for the subject" do
      it "returns its references" do
        references = Reference.references_for(subject)

        expect(references).to include(proposal)
        expect(references).to include(debate)
        expect(references).to_not include(subject)
      end
    end

    context "for a particular proposal" do
      it "returns its references" do
        references = Reference.references_for(proposal)

        expect(references).to include(proposal)
        expect(references).to include(debate)
        expect(references).to_not include(subject)
      end
    end
  end
end
