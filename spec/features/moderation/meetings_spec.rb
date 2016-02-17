require 'rails_helper'

feature 'Moderate meetings' do
  before :each do
    @category = create(:category)
    @subcategory = create(:subcategory, category_id: @category.id)
  end

  context 'As a moderator' do
    before :each do 
      @moderator = create(:moderator)
      login_as(@moderator)

      @meeting_data = {
        title: 'First meeting',
        description: 'We are going to discuss a few things',
        address: 'Passeig de Sant Joan, 11',
        held_at: '01/12/2016',
        start_at: '10:00',
        end_at: '10:00'
      }
    end

    def fill_in_meeting_form
      fill_in 'meeting_title', with: @meeting_data[:title]
      fill_in 'meeting_description', with: @meeting_data[:description]
      page.find('input[name="meeting[address]"]').set(@meeting_data[:address])
      fill_in 'meeting_held_at', with: @meeting_data[:held_at]
      fill_in 'meeting_start_at', with: @meeting_data[:start_at]
      fill_in 'meeting_end_at', with: @meeting_data[:end_at]
      page.find(".category-#{@category.id}").click
      page.find(".subcategory-#{@subcategory.id}").click
    end

    scenario 'Create a meeting with valid values', :js do
      visit new_moderation_meeting_path

      fill_in_meeting_form

      click_button 'Create meeting'

      expect(page).to have_content @meeting_data[:title]
      expect(page).to have_content @meeting_data[:description]
      expect(page).to have_content I18n.l @meeting_data[:held_at].to_date
      expect(page).to have_content @meeting_data[:start_at]
      expect(page).to have_content @meeting_data[:end_at]
    end

    scenario 'Create a meeting with some invalid values', :js do
      visit new_moderation_meeting_path

      fill_in_meeting_form

      fill_in 'meeting_title', with: ''

      click_button 'Create meeting'

      expect(page).to_not have_content "Meeting created successfully."
      expect(page).to have_content "1 error"
    end

    scenario 'List all meetings' do
      other_moderator = create(:moderator)
      create(:meeting, title: "My meeting", author: @moderator)
      create(:meeting, title: "Other meeting", author: other_moderator)

      visit moderation_meetings_path

      expect(page).to have_content "My meeting"
      expect(page).to have_content "Other meeting"
    end

    scenario 'Update a meeting', :js do
      meeting = create(:meeting, title: "My meeting", author: @moderator)
      visit edit_moderation_meeting_path(meeting)

      fill_in 'meeting_title', with: "My updated meeting"

      click_button 'Update meeting'

      expect(page).to have_content "My updated meeting"
    end

    scenario 'Update a meeting with some invalid values', :js do
      meeting = create(:meeting, title: "My meeting", author: @moderator)
      visit edit_moderation_meeting_path(meeting)

      fill_in 'meeting_title', with: ''

      click_button 'Update meeting'

      expect(page).to_not have_content "Meeting updated successfully."
      expect(page).to have_content "1 error"
    end

  end

  context 'As an administrator' do
    before :each do 
      @admin = create(:administrator)
      login_as(@admin)
    end

    scenario 'List all meetings' do 
      create(:meeting, title: "My meeting")
      create(:meeting, title: "Other meeting")

      visit moderation_meetings_path

      expect(page).to have_content "My meeting"
      expect(page).to have_content "Other meeting"
    end
  end

  scenario 'Using the search filter' do 
    moderator = create(:moderator)
    login_as(moderator)

    create(:meeting, title: "A meeting about dogs")
    create(:meeting, title: "A meeting about cats")

    visit moderation_meetings_path

    fill_in 'search', with: "dogs"
    click_button 'Search'

    expect(page).to have_content "A meeting about dogs"
    expect(page).to_not have_content "A meeting about cats"
  end

  scenario 'Edit meetings proposals', :js do
    admin = create(:administrator)
    login_as(admin)

    create(:proposal, title: "My proposal")
    create(:meeting, title: "My meeting")

    visit moderation_meetings_path

    click_link 'Edit'

    fill_in 'proposal_search_input', with: "My proposal"
    page.find('a', text: "My proposal").click

    click_button "Update meeting"

    expect(page).to have_content "Meeting updated successfully."
  end

  scenario 'Close a meeting', :js do 
    moderator = create(:moderator)
    login_as(moderator)

    proposal_1 = create(:proposal, title: "A proposal to discuss #1")
    proposal_2 = create(:proposal, title: "A proposal to discuss #2")
    create(:meeting, title: "A finished meeting", proposals: [proposal_1, proposal_2])

    visit moderation_meetings_path
    click_link 'Close'

    fill_in_ckeditor 'meeting_close_report', with: 'We discussed a few proposals and decided some things'

    fill_in 'meeting_meeting_proposals_attributes_0_votes', with: 100
    fill_in 'meeting_meeting_proposals_attributes_0_groups', with: 'A,B,C'
    fill_in 'meeting_meeting_proposals_attributes_1_votes', with: 300
    fill_in 'meeting_meeting_proposals_attributes_1_groups', with: 'D'

    click_button "Close meeting"

    expect(page).to have_content "Meeting updated successfully."
    expect(page).to_not have_content "A finished meeting"
  end

  scenario 'Delete a meeting', :js do 
    moderator = create(:moderator)
    login_as(moderator)

    proposal_1 = create(:proposal, title: "A proposal to discuss #1")
    proposal_2 = create(:proposal, title: "A proposal to discuss #2")
    create(:meeting, title: "A meeting", proposals: [proposal_1, proposal_2])

    visit moderation_meetings_path
    click_link 'Delete'

    expect(page).to have_content "Meeting deleted successfully."
    expect(page).to_not have_content "A meeting"
  end

  scenario "Download report" do
    moderator = create(:moderator)
    login_as(moderator)

    create(:proposal, title: "A proposal to discuss #1")
    create(:proposal, title: "A proposal to discuss #2")

    visit moderation_meetings_path
    expect{ click_link "Download XLS report" }.not_to raise_error
  end
end
