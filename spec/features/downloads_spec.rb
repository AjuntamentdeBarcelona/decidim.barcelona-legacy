require 'rails_helper'

feature 'Downloads' do
  scenario "Index downloads should show the correct links", :js do

    visit page_path('download', locale: 'ca')

    expect(page).to have_css("a[href='http://www.barcelona.cat/download/pam/ca/PAD-Sants-Montjuic-CAT.pdf']")

    visit page_path('download', locale: 'es')

    expect(page).to have_css("a[href='http://www.barcelona.cat/download/pam/es/PAD-Sants-Montjuic-CAST.pdf']")
  end
end

