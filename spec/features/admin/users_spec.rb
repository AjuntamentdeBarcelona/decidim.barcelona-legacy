require 'rails_helper'

feature 'Admin users' do

  background do
    admin = create(:administrator)
    login_as(admin)
  end

  scenario 'Show user activity' do
    user = create(:user, :hidden)

    debate1 = create(:debate, :hidden, author: user)
    debate2 = create(:debate, author: user)
    comment1 = create(:comment, :hidden, user: user, commentable: debate2, body: "You have the manners of a beggar")
    comment2 = create(:comment, user: user, commentable: debate2, body: 'Not Spam')

    visit edit_admin_user_path(user)

    expect(page).to have_content(debate1.title)
    expect(page).to have_content(debate2.title)
    expect(page).to have_content(comment1.body)
    expect(page).to have_content(comment2.body)
  end

  scenario 'Restore' do
    user = create(:user, :hidden)
    visit admin_users_path

    click_link 'Pending hide'
    click_link 'Restore'

    expect(page).to_not have_content(user.username)

    expect(user.reload).to_not be_hidden
  end

  scenario 'Confirm hide' do
    user = create(:user, :hidden)
    visit admin_users_path

    click_link "Pending hide"
    click_link 'Confirm'

    expect(page).to_not have_content(user.username)
    click_link('Hidden')
    expect(page).to have_content(user.username)

    expect(user.reload).to be_confirmed_hide
  end

  scenario "Filtering users" do
    create(:user, :hidden, username: "Unconfirmed")
    create(:user, :hidden, :with_confirmed_hide, username: "Confirmed user")

    visit admin_users_path(filter: 'all')
    expect(page).to have_content('Unconfirmed')
    expect(page).to have_content('Confirmed user')

    visit admin_users_path(filter: 'with_confirmed_hide')
    expect(page).to_not have_content('Unconfirmed')
    expect(page).to have_content('Confirmed user')
  end

  scenario "Action links remember the pagination setting and the filter" do
    per_page = Kaminari.config.default_per_page
    (per_page + 2).times { create(:user, :hidden, :with_confirmed_hide) }

    visit admin_users_path(filter: 'with_confirmed_hide', page: 2)

    click_on('Restore', match: :first, exact: true)

    expect(current_url).to include('filter=with_confirmed_hide')
    expect(current_url).to include('page=2')
  end

  scenario "Change user data" do
    user = create(:user, username: "Test user")
    visit admin_users_path
    click_link "Test user"

    fill_in "user[email]", with: "another@email.com"
    check "user[verified]"
    check "moderator"
    find('*[type=submit]').click

    user.reload
    expect(user.email).to eq("another@email.com")
    expect(user.verified_at).to be
    expect(user.roles).to include("moderator")
  end
end
