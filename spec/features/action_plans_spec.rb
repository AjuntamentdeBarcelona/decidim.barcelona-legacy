# coding: utf-8
require 'rails_helper'

feature 'Action plans', :js do
  let!(:subcategory) { create(:subcategory) }
  let(:category) { subcategory.category }
  let(:reviewer) { create(:user, :reviewer) }

  before :each do
    login_as(reviewer)
  end

  scenario 'Create an action plan from scratch' do
    proposal = create(:proposal, title: "A good looking proposal")
    visit action_plans_path

    click_link "New action plan" 
    fill_in "action_plan_title", with: "My action plan title"
    fill_in_editor "action_plan_description", with: "My action plan description"
    choose 'action_plan_scope_district'
    select 'Ciutat Vella', from: 'action_plan_district'
    find('li', text: category.name["en"]).click
    find('li', text: subcategory.name["en"]).click
    page.find("#autocomplete-1").send_keys("good looking")
    page.find("#autocomplete_result_#{proposal.id}").click
    click_button "Create action plan"

    expect(page).to have_content("My action plan title")
    expect(page).to have_content("My action plan description")
    expect(page).to have_content("A good looking proposal")
  end
end
