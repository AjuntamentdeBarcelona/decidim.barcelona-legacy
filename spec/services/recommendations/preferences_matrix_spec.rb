require 'rails_helper'

module Recommendations
  describe "PreferencesMatrix" do
    before :each do
      @scales = [double(:scale, object_id: 1), double(:scale, object_id: 2)]
      @subject_ids = [1, 2]
      @store = double(:store)

      @pref_matrix = PreferencesMatrix.new(@store, @scales, @subject_ids)

      allow(@scales[0]).to receive(:weight_for).with(@subject_ids[0]).and_return(1)
      allow(@scales[0]).to receive(:weight_for).with(@subject_ids[1]).and_return(10)
      allow(@scales[1]).to receive(:weight_for).with(@subject_ids[0]).and_return(5)
      allow(@scales[1]).to receive(:weight_for).with(@subject_ids[1]).and_return(0)

      allow(@store).to receive(:save)
      allow(@store).to receive(:load)
    end

    describe "#result" do
      it "should return a matrix with user-proposal weights" do
        expect(@pref_matrix.result).to eq({
          1 => { 1 => 1,  2 => 5 },
          2 => { 1 => 10 }
        })
      end
    end

    describe "#save" do
      it "should delegate it to the store" do
        @pref_matrix.save
        expect(@store).to have_received(:save).with(@pref_matrix.result)
      end
    end

    describe "#load" do
      it "should delegate it to the store" do
        @pref_matrix.load
        expect(@store).to have_received(:load)
      end
    end
  end
end
