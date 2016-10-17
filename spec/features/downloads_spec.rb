require 'rails_helper'

feature 'Downloads' do
  include ActionView::Helpers

  before :each do
    @participatory_process = create(:participatory_process)
  end

  scenario "Index downloads should show the correct links", :js do

    visit page_path(id: 'download', participatory_process_id: @participatory_process.id, step_id: participatory_process.active_step)

    expect(page).to have_xpath "//a[contains(@href, #{asset_url('pla_municipal.pdf')})]"
  end
end

