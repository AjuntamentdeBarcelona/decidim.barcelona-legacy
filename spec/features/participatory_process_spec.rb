# coding: utf-8
require 'rails_helper'

feature 'Participatory processes' do
  before :each do
    @full = create(:participatory_process, name: "Complete process")
    @half = create(:participatory_process, name: "Half process")
    @unpublished = create(:participatory_process, name: "Unpublished", published: false)
    @half.active_step.update_attribute(:flags, ["proposals", "debates"])
  end

  scenario "Index" do
    visit participatory_processes_path
    expect(page).to have_content("Complete process")
    expect(page).to have_content("Half process")
    expect(page).to_not have_content("Unpublished")
  end

  scenario "Show process with all features" do
    visit participatory_processes_path
    click_link "Complete process", match: :first

    within ".process-nav" do
      expect(page).to have_content("Proposals")
      expect(page).to have_content("Action plans")
      expect(page).to have_content("Presencial meetings")
      expect(page).to have_content("Debates")
    end
  end

  scenario "Show process with half features" do
    visit participatory_processes_path
    click_link "Half process", match: :first

    within ".process-nav" do
      expect(page).to have_content("Proposals")
      expect(page).to_not have_content("Action plans")
      expect(page).to_not have_content("Presencial meetings")
      expect(page).to have_content("Debates")
    end
  end

  scenario "Navigate to a disabled feature" do
    visit meetings_path(participatory_process_id: @half)

    expect(page).to have_content("This feature is not enabled for this process")
    expect(current_path).to eq(participatory_process_path(@half))
  end
end