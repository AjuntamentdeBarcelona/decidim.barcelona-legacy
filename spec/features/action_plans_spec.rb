# coding: utf-8
require 'rails_helper'

feature 'Action plans', :js do
  let!(:participatory_process) { create(:participatory_process) }
  let!(:category) { create(:category, participatory_process: participatory_process) }
  let!(:subcategory) { create(:subcategory, category: category, participatory_process: participatory_process) }
  let!(:reviewer) { create(:user, :reviewer) }

  before :each do
    login_as(reviewer)
  end

  scenario 'Create an action plan from scratch' do
    proposal = create(:proposal, participatory_process: participatory_process, title: "A good looking proposal")

    visit action_plans_path(participatory_process_id: participatory_process)
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
    expect(page).to have_content("Ciutat Vella")
    expect(page).to have_content(category.name["en"])
    expect(page).to have_content(subcategory.name["en"])
  end

  scenario 'Create an action plan from an existing proposal' do
    comment = create(:comment)
    proposal = create(:proposal, participatory_process: participatory_process, title: "A good looking proposal")
    related = create(:proposal, participatory_process: participatory_process, title: "A related proposal")
    Reference.create(source: comment, referrer: proposal, referenced: related)

    visit proposals_path(participatory_process_id: participatory_process)
    click_link "A good looking proposal"
    click_link "Create action plan"
    click_button "Create action plan"

    expect(page).to have_content("A good looking proposal")
    expect(page).to have_content("A related proposal")
    expect(page).to have_content(proposal.district)
    expect(page).to have_content(proposal.category.name["ca"])
    expect(page).to have_content(proposal.subcategory.name["en"])
  end

  scenario 'Edit an existing action plan' do
    action_plan = create(:action_plan, participatory_process: participatory_process, scope: 'city')

    visit action_plans_path(participatory_process_id: participatory_process)
    click_link action_plan.title
    choose 'action_plan_scope_district'
    select 'Ciutat Vella', from: 'action_plan_district'
    visit action_plans_path(participatory_process_id: participatory_process)

    expect(page).to have_content("Ciutat Vella")
  end

  scenario 'Create a new revision for an action plan' do
    action_plan = create(:action_plan, participatory_process: participatory_process)

    visit action_plans_path(participatory_process_id: participatory_process)
    click_link action_plan.title
    click_link "New revision"
    fill_in "action_plan_revision_title", with: "My title revision"
    fill_in_editor "action_plan_revision_description", with: "My description revision"
    click_button "Create revision"

    expect(page).to have_content("My title revision")
    expect(page).to have_content("My description revision")
  end

  scenario 'Filter action plans by category' do
    target_action_plan = create(:action_plan, participatory_process: participatory_process, category: category)
    another_action_plan = create(:action_plan, participatory_process: participatory_process)

    visit action_plans_path(participatory_process_id: participatory_process)
    choose "filter_category_id_#{category.id}"

    expect(page).to have_content(target_action_plan.title)
    expect(page).not_to have_content(another_action_plan.title)
  end

  scenario 'Filter action plans by search' do
    action_plan = create(:action_plan, participatory_process: participatory_process)
    action_plan.revisions << create(:action_plan_revision, title: 'A good action plan')
    action_plan = create(:action_plan, participatory_process: participatory_process)
    action_plan.revisions << create(:action_plan_revision, title: 'A bad action plan')

    visit action_plans_path(participatory_process_id: participatory_process)
    find('.search-filter').send_keys("good")

    expect(page).to have_content('A good action plan')
    expect(page).not_to have_content('A bad action plan')
  end

  scenario 'Delete an action plan' do
    action_plan = create(:action_plan, participatory_process: participatory_process)

    visit action_plans_path(participatory_process_id: participatory_process)
    click_link action_plan.title
    page.find('a', text: 'remove').click
    visit action_plans_path(participatory_process_id: participatory_process)

    expect(page).not_to have_content(action_plan.title)
  end

  scenario 'Approve an action plan' do 
    approved_action_plan = create(:action_plan, participatory_process: participatory_process)
    non_approved_action_plan = create(:action_plan, participatory_process: participatory_process)

    visit action_plans_path(participatory_process_id: participatory_process)
    click_link approved_action_plan.title
    page.find('a', text: 'approve').click
    visit action_plans_path(participatory_process_id: participatory_process)
    choose 'filter_action_plan_approval_approved'

    expect(page).to have_content(approved_action_plan.title)
    expect(page).not_to have_content(non_approved_action_plan.title)
  end
end
