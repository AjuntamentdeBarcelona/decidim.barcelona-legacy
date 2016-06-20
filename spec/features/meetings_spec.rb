require 'rails_helper'

feature 'Meetings' do
  let(:participatory_process) { create(:participatory_process) }

  scenario "Index page show past events by default", :js do
    create(:meeting, participatory_process: participatory_process, title: "Meeting 1")
    create(:meeting, participatory_process: participatory_process, title: "Meeting 2", held_at: 1.week.ago)
    create(:meeting, participatory_process: participatory_process, title: "Meeting 3")

    user = create(:user)
    login_as(user)

    visit meetings_path

    expect(page).to_not have_selector('.meeting-title', text: 'Meeting 1')
    expect(page).to have_selector('.meeting-title', text: 'Meeting 2')
    expect(page).to_not have_selector('.meeting-title', text: 'Meeting 3')
  end

  scenario "Show page doesn't show edit buttons by default", :js do
    meeting = create(:meeting, participatory_process: participatory_process, title: "Meeting 1")

    visit meeting_path(meeting, participatory_process_id: meeting.participatory_process.slug)

    expect(page).to have_content(meeting.title)
    expect(page).to have_content(meeting.description)
    expect(page).to have_content(meeting.address)
    expect(page).to_not have_content('Edit')
    expect(page).to_not have_content('Pictures')
    expect(page).to_not have_content('Close')
  end

  scenario "Show page shows edit buttons to moderators", :js do
    moderator = create(:moderator) 
    meeting = create(:meeting, participatory_process: participatory_process, title: "Meeting 1")

    login_as(moderator)
    visit meeting_path(meeting, participatory_process_id: meeting.participatory_process.slug)

    expect(page).to have_content('Edit')
    expect(page).to have_content('Pictures')
    expect(page).to have_content('Close')
  end
end
