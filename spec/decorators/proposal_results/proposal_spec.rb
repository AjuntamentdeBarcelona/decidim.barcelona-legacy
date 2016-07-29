# coding: utf-8
require 'rails_helper'

describe ProposalResults::Proposal do
  let(:proposal) { create(:proposal) }
  let(:decorator) { ProposalResults::ProposalDecorator.new(proposal) }

  describe '#title' do
    it "delegates to the proposal's title" do
      expect(proposal.title).to eq(decorator.title)
    end
  end

  describe 'message' do
    context 'when accepted' do
      before do
        create(:proposal_answer, {
                 proposal: proposal,
                 status: 'accepted',
                 message: 'Private notes.'
               })
      end

      it "doesn't include the private notes" do
        expect(decorator.message).to_not eq('Private notes.')
      end
    end

    context 'when rejected' do
      before do
        create(:proposal_answer, {
                 proposal: proposal,
                 status: 'rejected',
                 message: 'Rejection reason.'
               })
      end

      it 'includes the private notes' do
        expect(decorator.message).to eq('Rejection reason.')
      end
    end
  end
end
