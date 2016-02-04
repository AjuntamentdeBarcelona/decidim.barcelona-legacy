require 'rails_helper'

module Recommendations
  describe Engine do
    before :each do
      @user_id = 1
      @object_ids = [1, 2, 3, 4, 5]
      @exclude_object_ids = [1, 3]
      @pref_matrix = {
        1 => { 1 => 10, 3 => 1, 4 => -1},
        2 => { 1 => 2, 2 => 10},
        3 => { 3 => 10 },
        4 => { 4 => 10 },
        5 => { 5 => 10 }
      }
      @recommendations = Engine.get_recommendations(@pref_matrix, @user_id, @object_ids, @exclude_object_ids)
    end

    describe ".get_recommendations" do
      it "should get recommendations based on distances" do
        expect(@recommendations.map(&:second)).to eq([2, 5, 4])
      end

      it "should not recommend objects in exclude list" do
        expect(@recommendations.map(&:second)).to_not include(@exclude_object_ids[0])
        expect(@recommendations.map(&:second)).to_not include(@exclude_object_ids[1])
      end
    end

    describe ".create_table" do
      it "should create recommendations for a specific user" do
        expect(Recommendation).to receive_message_chain(:where, :delete_all)
        @recommendations.each do |recommendation|
          expect(Recommendation).to receive(:create).with(user_id: @user_id, proposal_id: recommendation[1], score: recommendation[0]) 
        end
        Engine.create_table(@pref_matrix, @user_id, @object_ids, @exclude_object_ids)
      end
    end
  end
end
