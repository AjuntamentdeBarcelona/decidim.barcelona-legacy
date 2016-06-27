require 'rails_helper'

feature 'Votes' do
  let(:participatory_process) { create(:participatory_process) }

  before do
    Setting['feature.debates.vote'] = true
  end

  before :each do
    @manuela = create(:user, verified_at: Time.now)
    @pablo = create(:user)
  end

  feature 'Debates' do
    background { login_as(@manuela) }

    scenario "Index shows user votes on debates" do

      debate1 = create(:debate, participatory_process: participatory_process)
      debate2 = create(:debate, participatory_process: participatory_process)
      debate3 = create(:debate, participatory_process: participatory_process)
      create(:vote, voter: @manuela, votable: debate1, vote_flag: true)
      create(:vote, voter: @manuela, votable: debate3, vote_flag: false)

      visit debates_path(participatory_process_id: participatory_process)

      within("#debates") do
        within("#debate_#{debate1.id}_votes") do
          within(".in-favor") do
            expect(page).to have_css(".voted")
            expect(page).to_not have_css(".no-voted")
          end

          within(".against") do
            expect(page).to have_css(".no-voted")
            expect(page).to_not have_css(".voted")
          end
        end

        within("#debate_#{debate2.id}_votes") do
          within(".in-favor") do
            expect(page).to_not have_css(".voted")
            expect(page).to_not have_css(".no-voted")
          end

          within(".against") do
            expect(page).to_not have_css(".no-voted")
            expect(page).to_not have_css(".voted")
          end
        end

        within("#debate_#{debate3.id}_votes") do
          within(".in-favor") do
            expect(page).to have_css(".no-voted")
            expect(page).to_not have_css(".voted")
          end

          within(".against") do
            expect(page).to have_css(".voted")
            expect(page).to_not have_css(".no-voted")
          end
        end
      end
    end

    feature 'Single debate' do
      background do
        @debate = create(:debate, participatory_process: participatory_process)
      end

      scenario 'Show no votes' do
        visit debate_path(@debate, participatory_process_id: @debate.participatory_process)

        expect(page).to have_content "No votes"

        within('.in-favor') do
          expect(page).to have_content "0%"
          expect(page).to_not have_css(".voted")
          expect(page).to_not have_css(".no-voted")
        end

        within('.against') do
          expect(page).to have_content "0%"
          expect(page).to_not have_css(".voted")
          expect(page).to_not have_css(".no-voted")
        end
      end

      scenario 'Update', :js do
        visit debate_path(@debate, participatory_process_id: @debate.participatory_process)

        find('.in-favor button').click
        find('.against a').click

        within('.in-favor') do
          expect(page).to have_content "0%"
          expect(page).to have_css(".no-voted")
        end

        within('.against') do
          expect(page).to have_content "100%"
          expect(page).to have_css(".voted")
        end

        expect(page).to have_content "1 vote"
      end

      scenario 'Trying to vote multiple times', :js do
        visit debate_path(@debate, participatory_process_id: @debate.participatory_process)

        find('.in-favor button').click
        expect(page).to have_content "1 vote"
        find('.in-favor button').click
        expect(page).to_not have_content "2 votes"

        within('.in-favor') do
          expect(page).to have_content "100%"
        end

        within('.against') do
          expect(page).to have_content "0%"
        end
      end

      scenario 'Show' do
        create(:vote, voter: @manuela, votable: @debate, vote_flag: true)
        create(:vote, voter: @pablo, votable: @debate, vote_flag: false)

        visit debate_path(@debate, participatory_process_id: @debate.participatory_process)

        expect(page).to have_content "2 votes"

        within('.in-favor') do
          expect(page).to have_content "50%"
          expect(page).to have_css(".voted")
        end

        within('.against') do
          expect(page).to have_content "50%"
          expect(page).to have_css(".no-voted")
        end
      end

      scenario 'Create from debate show', :js do
        visit debate_path(@debate, participatory_process_id: @debate.participatory_process)

        find('.in-favor button').click

        within('.in-favor') do
          expect(page).to have_content "100%"
          expect(page).to have_css(".voted")
        end

        within('.against') do
          expect(page).to have_content "0%"
          expect(page).to have_css(".no-voted")
        end

        expect(page).to have_content "1 vote"
      end

      scenario 'Create in index', :js do
        visit debates_path(participatory_process_id: participatory_process)

        within("#debates") do

          find('.in-favor button').click

          within('.in-favor') do
            expect(page).to have_content "100%"
            expect(page).to have_css(".voted")
          end

          within('.against') do
            expect(page).to have_content "0%"
            expect(page).to have_css(".no-voted")
          end

          expect(page).to have_content "1 vote"
        end
      end
    end
  end

  feature 'Proposals' do
    background { login_as(@manuela) }

    scenario "Index shows user votes on proposals", :js do
      proposal1 = create(:proposal, participatory_process: participatory_process)
      proposal2 = create(:proposal, participatory_process: participatory_process)
      proposal3 = create(:proposal, participatory_process: participatory_process)
      create(:vote, voter: @manuela, votable: proposal1, vote_flag: true)

      visit proposals_path(participatory_process_id: participatory_process)

      within("#proposals") do
        within("#proposal_#{proposal1.id}_votes") do
          expect(page).to have_content "You have already supported this proposal. Share it!"
        end

        within("#proposal_#{proposal2.id}_votes") do
          expect(page).to_not have_content "You have already supported this proposal. Share it!"
        end

        within("#proposal_#{proposal3.id}_votes") do
          expect(page).to_not have_content "You have already supported this proposal. Share it!"
        end
      end
    end

    feature 'Single proposal' do
      background do
        @proposal = create(:proposal, participatory_process: participatory_process)
      end

      scenario 'Show no votes', :js do
        visit proposal_path(@proposal, participatory_process_id: @proposal.participatory_process)
        expect(page).to have_content "0 supports"
      end

      scenario 'Trying to vote multiple times', :js do
        visit proposal_path(@proposal, participatory_process_id: @proposal.participatory_process)

        within('.supports') do
          find('.in-favor button').click
          expect(page).to have_content "1 support"

          expect(page).to_not have_selector ".in-favor button"
        end
      end

      scenario 'Show', :js do
        create(:vote, voter: @manuela, votable: @proposal, vote_flag: true)
        create(:vote, voter: @pablo, votable: @proposal, vote_flag: true)

        visit proposal_path(@proposal, participatory_process_id: @proposal.participatory_process)

        within('.supports') do
          expect(page).to have_content "2 supports"
        end
      end

      scenario 'Create from proposal show', :js do
        visit proposal_path(@proposal, participatory_process_id: @proposal.participatory_process)

        within('.supports') do
          find('.in-favor button').click

          expect(page).to have_content "1 support"
          expect(page).to have_content "You have already supported this proposal. Share it!"
        end
      end

      scenario 'Create in listed proposal in index', :js do
        visit proposals_path(participatory_process_id: participatory_process)

        expect(page).to have_selector("#proposal_#{@proposal.id}")

        within("#proposal_#{@proposal.id}") do
          find('.in-favor button').click

          expect(page).to have_content "1 support"
          expect(page).to have_content "You have already supported this proposal. Share it!"
        end
      end
    end
  end

  scenario 'Not logged user trying to vote debates', :js do
    debate = create(:debate, participatory_process: participatory_process)

    visit debates_path(participatory_process_id: participatory_process)
    within("#debate_#{debate.id}") do
      find("div.votes button").hover
      expect_message_you_need_to_sign_in
    end
  end

  scenario 'Not logged user trying to vote proposals', :js do
    proposal = create(:proposal, participatory_process: participatory_process)

    visit proposals_path(participatory_process_id: participatory_process)
    within("#proposal_#{proposal.id}") do
      find("div.supports button").hover
      expect_message_you_need_to_sign_in
    end

    visit proposal_path(proposal, participatory_process_id: proposal.participatory_process)
    within("#proposal_#{proposal.id}") do
      find("div.supports button").hover
      expect_message_you_need_to_sign_in
    end
  end

  scenario 'Anonymous user trying to vote debates', :js do
    user = create(:user)
    debate = create(:debate, participatory_process: participatory_process)

    Setting["max_ratio_anon_votes_on_debates"] = 50
    debate.update(cached_anonymous_votes_total: 520, cached_votes_total: 1000)

    login_as(user)

    visit debates_path(participatory_process_id: participatory_process)
    within("#debate_#{debate.id}") do
      find("div.votes button").hover
      expect_message_to_many_anonymous_votes
    end

    visit debate_path(debate, participatory_process_id: debate.participatory_process)
    within("#debate_#{debate.id}") do
      find("div.votes button").hover
      expect_message_to_many_anonymous_votes
    end
  end

  scenario "Anonymous user trying to vote proposals", :js do
    user = create(:user)
    proposal = create(:proposal, participatory_process: participatory_process)

    login_as(user)
    visit proposals_path(participatory_process_id: participatory_process)

    within("#proposal_#{proposal.id}") do
      find("div.supports button").hover
      expect_message_only_verified_can_vote_proposals
    end

    visit proposal_path(proposal, participatory_process_id: proposal.participatory_process)
    within("#proposal_#{proposal.id}") do
      find("div.supports button").hover
      expect_message_only_verified_can_vote_proposals
    end
  end
end
