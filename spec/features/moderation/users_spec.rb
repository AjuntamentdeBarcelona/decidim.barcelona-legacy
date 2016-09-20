require 'rails_helper'

feature 'Moderate users', :js do
  let(:participatory_process) { create(:participatory_process) }

  scenario 'Hide' do
    citizen = create(:user)
    moderator = create(:moderator)

    debate1 = create(:debate, participatory_process: participatory_process, author: citizen)
    debate2 = create(:debate, participatory_process: participatory_process, author: citizen)
    debate3 = create(:debate, participatory_process: participatory_process)
    comment3 = create(:comment, user: citizen, commentable: debate3, body: 'SPAMMER')

    login_as(moderator)
    visit debates_path(participatory_process_id: participatory_process)

    expect(page).to have_content(debate1.title)
    expect(page).to have_content(debate2.title)
    expect(page).to have_content(debate3.title)

    visit debate_path(debate3, participatory_process_id: debate3.participatory_process)

    expect(page).to have_content(comment3.body)

    visit debate_path(debate1, participatory_process_id: debate1.participatory_process)

    within("#debate_#{debate1.id}") do
      click_link 'Block author'
    end

    visit debates_path(participatory_process_id: participatory_process)

    expect(page).to_not have_content(debate1.title)
    expect(page).to_not have_content(debate2.title)
    expect(page).to have_content(debate3.title)

    visit debate_path(debate3, participatory_process_id: debate3.participatory_process)

    expect(page).to_not have_content(comment3.body)

    click_link("Sign out")

    click_link 'Sign in', match: :first
    fill_in 'user_email',    with: citizen.email
    fill_in 'user_password', with: citizen.password
    click_button 'Enter'

    expect(page).to have_content 'Invalid email or password'
    expect(current_path).to eq(new_user_session_path)
  end

  scenario 'Search and ban users' do
    citizen = create(:user, username: 'Wanda Maximoff')
    moderator = create(:moderator)

    login_as(moderator)

    visit moderation_users_path

    expect(page).not_to have_content citizen.name
    fill_in 'name_or_email', with: 'Wanda'
    click_button 'Search'

    within(".admin-list") do
        expect(page).to have_content citizen.name
        expect(page).not_to have_content "Blocked"
        click_link 'Block'
    end

    within(".admin-list") do
      expect(page).to have_content citizen.name
      expect(page).to have_content "Blocked"
    end
  end

end
