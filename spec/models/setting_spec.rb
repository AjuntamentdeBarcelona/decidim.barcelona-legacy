require 'rails_helper'

describe Setting do
  context "when it exists" do
    it "should should return the value" do
      expect(Setting['brand_name']).not_to be_blank
    end
  end

  context "when overriden" do
    before do
      Setting["official_level_1_name"] = 'Stormtrooper'
    end

    it "should return the overriden setting" do
      expect(Setting['official_level_1_name']).to eq('Stormtrooper')
    end
  end

  context "when it doesn't exist" do
    it "should should return nil" do
      expect(Setting['undefined_key']).to eq(nil)
    end
  end
end
