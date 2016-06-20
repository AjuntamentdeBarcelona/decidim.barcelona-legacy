require 'rails_helper'

describe DebatesController do
  let(:participatory_process) { create(:participatory_process) }

  before(:each) do
    Setting['feature.debates'] = true
  end

  describe "Vote with too many anonymous votes" do
    it 'should allow vote if user is allowed' do
      Setting["max_ratio_anon_votes_on_debates"] = 100
      debate = create(:debate)
      sign_in create(:user)

      expect do
        xhr :post, :vote, id: debate.id, value: 'yes'
      end.to change { debate.reload.votes_for.size }.by(1)
    end

    it 'should not allow vote if user is not allowed' do
      Setting["max_ratio_anon_votes_on_debates"] = 0
      debate = create(:debate, cached_votes_total: 1000)
      sign_in create(:user)

      expect do
        xhr :post, :vote, id: debate.id, value: 'yes'
      end.to_not change { debate.reload.votes_for.size }
    end
  end
end
