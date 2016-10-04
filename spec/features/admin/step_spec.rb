# coding: utf-8
require 'rails_helper'

feature 'Admin steps' do
  background do
    @participatory_process = create(:participatory_process, name: "test")
    admin = create(:administrator)
    login_as(admin)
  end

  scenario "Create a step for an existing participatory process", :js do
    visit admin_participatory_process_steps_path(@participatory_process)

    click_link "Create step"

    fill_in "step_title_ca", with: "Comunicació"
    fill_in "step_title_es", with: "Comunicación"
    fill_in "step_title_en", with: "Communication"

    fill_in_editor "step_description_ca", with: "lorem ipsum ca"
    fill_in_editor "step_description_es", with: "lorem ipsum es"
    fill_in_editor "step_description_en", with: "lorem ipsum en"

    fill_in "step_start_at", with: "1/12/2016"
    fill_in "step_end_at", with: "1/12/2017"

    fill_in "step_position", with: 0

    click_button "Create step"

    expect(page).to have_content "Step created successfully."
    expect(page).to have_content "Communication"
  end
end