require 'rails_helper'

describe ResourceFilter do
  describe "filter params" do
    before :each do
      @proposal1 = create(:proposal, scope: "city")
      @proposal2 = create(:proposal, scope: "district", district: 1)
      @proposal3 = create(:proposal, scope: "district", district: 2)
    end

    it "should filter collection based on a single filter params" do
      filter = ResourceFilter.new(filter: 'scope=district')
      collection = filter.filter_collection(Proposal.all)
      expect(collection).to_not include(@proposal1)
      expect(collection).to include(@proposal2)
      expect(collection).to include(@proposal3)
    end

    it "should filter collection based on multiple filter params" do
      filter = ResourceFilter.new(filter: 'scope=district:district=1')
      collection = filter.filter_collection(Proposal.all)
      expect(collection).to_not include(@proposal1)
      expect(collection).to include(@proposal2)
      expect(collection).to_not include(@proposal3)
    end
  end
end
