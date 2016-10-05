# encoding: utf-8
require 'rails_helper'

feature 'Localization' do
  scenario 'Available locales appear in the locale switcher' do
    visit '/'

    within('.language-choose') do
      I18n.available_locales.each do |locale|
        expect(page).to have_content I18n.t("locale", locale: locale)
      end
    end
  end

  scenario 'Changing the locale', :js do
    I18n.locale = :es
    visit '/'

    within('.language-choose') do
      click_link 'English'
    end

    expect(page).to have_content("Participatory processes")
  end

  scenario 'Locale switcher not present if only one locale' do
    expect(I18n).to receive(:available_locales).and_return([:en])

    visit '/'

    expect(page).to_not have_css('.language-choose')
  end
end
