require 'rails_helper'

module Recommendations
  describe RedisMatrixStore do
    before :each do
      @store = RedisMatrixStore.new 'user_preferences'
    end

    describe "#save" do
      it "should store matrix rows as diferents hashes" do
        @store.save({
          "1" => { "1" => 10, "2" => 2 },
          "2" => { "1" => 5,  "2" => 8 }
        })
        expect($redis.keys('user_preferences*').length).to eq(2)
      end
    end

    describe "#load" do
      it "should load matrix from store" do
        $redis.hset "user_preferences_1", "1", 10
        $redis.hset "user_preferences_1", "2", 5
        $redis.hset "user_preferences_2", "1", 8
        $redis.hset "user_preferences_2", "2", 2
        expect(@store.load).to eq({
          "1" => { "1" => 10, "2" => 5 },
          "2" => { "1" => 8,  "2" => 2 }
        })
      end
    end

    describe "#store_single_value" do
      it "should update a specific value" do
        expect($redis).to receive("hset").with("user_preferences_1", "1", 20)
        @store.store_single_value("1", "1", 20)
      end
    end

    after :each do
      $redis.flushdb
    end
  end
end
