require 'rails_helper'

feature 'Registration form' do
  scenario 'username is not available', :js do
    user = create(:user)

    visit new_user_registration_path
    expect(page).to_not have_content I18n.t("devise_views.users.registrations.new.username_is_not_available")

    fill_in "user_username", with: user.username
    check 'user_terms_of_service'

    expect(page).to have_content I18n.t("devise_views.users.registrations.new.username_is_not_available")
  end

  scenario 'username is available', :js do
    visit new_user_registration_path
    expect(page).to_not have_content I18n.t("devise_views.users.registrations.new.username_is_available")

    fill_in "user_username", with: "available username"
    check 'user_terms_of_service'

    expect(page).to have_content I18n.t("devise_views.users.registrations.new.username_is_available")
  end

  scenario 'it activates all notifications when notifications by default is checked', :js do
    visit new_user_registration_path
    fill_in "user_username", with: 'userwithnotifications'
    fill_in "user_email", with: 'userwithnotifications@email.com'
    fill_in "user_password", with: 'test1234'
    fill_in "user_password_confirmation", with: 'test1234'
    check 'user_terms_of_service'
    check 'notifications_by_default'
    click_button("Register")

    expect(page).to have_content("Thank you for registering with the website")

    user = User.find_by(email: 'userwithnotifications@email.com')
    expect(user.email_on_comment).to be_truthy
    expect(user.email_on_comment_reply).to be_truthy
  end

  scenario 'it doesn not activate all notifications when notifications by default is unchecked', :js do
    visit new_user_registration_path
    fill_in "user_username", with: 'userwithnotifications'
    fill_in "user_email", with: 'userwithnotifications@email.com'
    fill_in "user_password", with: 'test1234'
    fill_in "user_password_confirmation", with: 'test1234'
    uncheck 'user_notifications_by_default'
    check 'user_terms_of_service'
    click_button("Register")

    expect(page).to have_content("Thank you for registering with the website")

    user = User.find_by(email: 'userwithnotifications@email.com')
    expect(user.email_on_comment).to_not be_truthy
    expect(user.email_on_comment_reply).to_not be_truthy
  end
end
