require 'rails_helper'

describe ResourceFilter do
  describe "filter params" do
    before :each do
      @proposal1 = create(:proposal, scope: "city")
      @proposal2 = create(:proposal, scope: "district", district: 1, official: true)
      @proposal3 = create(:proposal, scope: "district", district: 2, from_meeting: true)
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

    describe "#source" do
      it "should filter official resources" do
        filter = ResourceFilter.new(filter: 'source=official')
        collection = filter.filter_collection(Proposal.all)
        expect(collection).to_not include(@proposal1)
        expect(collection).to include(@proposal2)
        expect(collection).to_not include(@proposal3)
      end

      it "should filter official resources" do
        filter = ResourceFilter.new(filter: 'source=meetings')
        collection = filter.filter_collection(Proposal.all)
        expect(collection).to_not include(@proposal1)
        expect(collection).to_not include(@proposal2)
        expect(collection).to include(@proposal3)
      end

      it "should filter proposals from organizations" do
        @organization = create(:organization)
        @proposal4 = create(:proposal, author: @organization.user)

        filter = ResourceFilter.new(filter: 'source=organization')
        collection = filter.filter_collection(Proposal.all)
        expect(collection).to_not include(@proposal1)
        expect(collection).to_not include(@proposal2)
        expect(collection).to_not include(@proposal3)
        expect(collection).to_not include(@proposal4)
      end

      describe "interaction" do
        it "should filter voted proposals" do
          user = create(:user)
          user.likes(@proposal1)

          filter = ResourceFilter.new({ filter: 'interaction=voted' }, { user: user })
          collection = filter.filter_collection(Proposal.all)

          expect(collection).to include(@proposal1)
          expect(collection).to_not include(@proposal2, @proposal3)
        end

        it "should filter commented proposals" do
          user = create(:user)
          create(:comment, commentable: @proposal2, user: user)

          filter = ResourceFilter.new({ filter: 'interaction=commented' }, { user: user })
          collection = filter.filter_collection(Proposal.all)

          expect(collection).to include(@proposal2)
          expect(collection).to_not include(@proposal1, @proposal3)
        end

        it "should filter followed proposals" do
          user = create(:user)
          create(:follow, following: @proposal2, follower: user)

          filter = ResourceFilter.new({ filter: 'interaction=followed' }, { user: user })
          collection = filter.filter_collection(Proposal.all)

          expect(collection).to include(@proposal2)
          expect(collection).to_not include(@proposal1, @proposal3)
        end

        it "should filter created proposals" do
          user = @proposal3.author

          filter = ResourceFilter.new({ filter: 'interaction=created' }, { user: user })
          collection = filter.filter_collection(Proposal.all)

          expect(collection).to include(@proposal3)
          expect(collection).to_not include(@proposal1, @proposal2)
        end

        it "can be composed" do
          user = @proposal3.author
          user.likes @proposal1

          filter = ResourceFilter.new({ filter: 'interaction=created,voted' }, { user: user })
          collection = filter.filter_collection(Proposal.all)

          expect(collection).to include(@proposal1, @proposal3)
          expect(collection).to_not include(@proposal2)
        end
      end

      describe "associated action plans" do
        before do
          create(:action_plan, proposals: [@proposal2])
        end

        it "filters resources with associated action plans" do
          filter = ResourceFilter.new({ filter: 'action_plan=with_action_plan' })
          collection = filter.filter_collection(Proposal.all)

          expect(collection).to include(@proposal2)
          expect(collection).to_not include(@proposal1, @proposal3)
        end

        it "filters resources without associated action plans" do
          filter = ResourceFilter.new({ filter: 'action_plan=without_action_plan' })
          collection = filter.filter_collection(Proposal.all)

          expect(collection).to_not include(@proposal2)
          expect(collection).to include(@proposal1, @proposal3)
        end
      end
    end
  end
end
