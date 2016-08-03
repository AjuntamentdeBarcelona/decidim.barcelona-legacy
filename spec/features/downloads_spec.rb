require 'rails_helper'

feature 'Downloads' do
  include ActionView::Helpers

  scenario "Index downloads should show the correct links", :js do

    visit page_path('download')

    expect(page).to have_xpath "//a[contains(@href, #{asset_url('pla_municipal.pdf')})]"
  end
end

