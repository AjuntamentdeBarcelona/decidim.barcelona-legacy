# coding: utf-8
require 'rails_helper'

feature 'Moderate steps' do
  background do
    @participatory_process = create(:participatory_process, name: "test")
    @participatory_process.steps.delete_all
    moderator = create(:moderator)
    login_as(moderator)
  end

  scenario "Create a step for an existing participatory process", :js do
    visit moderation_participatory_process_steps_path(@participatory_process)

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

    check "proposals"
    check "debates"

    click_button "Create step"

    expect(page).to have_content "Step created successfully."
    expect(page).to have_content "Communication"
    expect(page).not_to have_content "Mark as active"
  end

  scenario "Edit an existing step", :js do
    step_1 = create(:step, participatory_process: @participatory_process, position: 0)
    step_2 = create(:step, participatory_process: @participatory_process, position: 2)
    step_3 = create(:step, participatory_process: @participatory_process, position: 3)

    visit edit_moderation_participatory_process_step_path(@participatory_process, step_3)

    fill_in "step_position", with: 1
    click_button "Update step"

    steps = all("#steps li")

    expect(page).to have_content "Step updated successfully."
    expect(steps[0]).to have_content step_1.decorate.title
    expect(steps[1]).to have_content step_3.decorate.title
    expect(steps[2]).to have_content step_2.decorate.title
  end

  scenario "Change active step", :js do
    step_1 = create(:step, participatory_process: @participatory_process, position: 0, active: false)
    step_2 = create(:step, participatory_process: @participatory_process, position: 1, active: true)

    visit moderation_participatory_process_steps_path(@participatory_process)

    click_link "Mark as active"

    steps = all("#steps li")

    expect(steps[0]).not_to have_content "Mark as active"
    expect(steps[1]).to have_content "Mark as active"
  end

  scenario "Destroy an existing step", :js do
    create(:step, participatory_process: @participatory_process)

    visit moderation_participatory_process_steps_path(@participatory_process)
    click_link "Delete"

    expect(page).to have_content("Restore")
  end

  scenario "Restore a deleted step", :js do
    step = create(:step, participatory_process: @participatory_process)
    step.destroy

    visit moderation_participatory_process_steps_path(@participatory_process)
    click_link "Restore"

    expect(page).to_not have_content("Restore")
  end
end
