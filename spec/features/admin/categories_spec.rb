# coding: utf-8
require 'rails_helper'

feature 'Admin categories', :js do
  let!(:participatory_process) { create(:participatory_process) }

  background do
    admin = create(:administrator)
    login_as(admin)
  end

  scenario "Can create new categories" do
    visit admin_categories_path

    click_link "Create axis"

    fill_in "category_position", with: 1
    fill_in "name_ca", with: "Eix 1"
    fill_in "name_es", with: "Eje 1"
    fill_in "name_en", with: "Axis 1"
    fill_in_editor 'description_ca', with: 'Aquesta es una categoria'
    fill_in_editor 'description_es', with: 'Esta es una categoría'
    fill_in_editor 'description_en', with: 'This is a category'

    click_button "Create axis"

    expect(page).to have_content "Category created successfully."
    expect(page).to have_content("1. Axis 1")
  end

  scenario "Edit an existing category" do
    create(:category, participatory_process_id: participatory_process.id, name: { en: "My axis" })

    visit admin_categories_path
    select participatory_process.name, from: 'participatory_process_id'

    click_link "Edit"

    fill_in "name_en", with: "My edited axis"

    click_button "Update axis"

    expect(page).to have_content "Category updated successfully."
    expect(page).to have_content("My edited axis")
  end

  scenario "Delete an existing category" do
    create(:category, participatory_process_id: participatory_process.id, name: { en: "My axis" })

    visit admin_categories_path
    select participatory_process.name, from: 'participatory_process_id'

    click_link "Delete"

    expect(page).to have_content "Category deleted successfully."
    expect(page).to_not have_content("My axis")
  end

  scenario "Create a subcategory for an existing category" do
    create(:category, participatory_process_id: participatory_process.id, name: { en: "My axis" }, position: 1)

    visit admin_categories_path
    select participatory_process.name, from: 'participatory_process_id'

    click_link "View strategic lines"
    sleep 1

    click_link "Create strategic line"

    fill_in "subcategory_position", with: 1
    fill_in "name_ca", with: "Línea de acció 1"
    fill_in "name_es", with: "Línea de acción 1"
    fill_in "name_en", with: "Action line 1"
    fill_in_editor 'description_ca', with: 'Aquesta es una subcategoria'
    fill_in_editor 'description_es', with: 'Esta es una subcategoría'
    fill_in_editor 'description_en', with: 'This is a subcategory'

    click_button "Create strategic line"

    expect(page).to have_content "Subcategory created successfully."
    expect(page).to have_content("1.1. Action line 1")
  end

  scenario "Edit an existing subcategory" do
    category = create(:category, participatory_process_id: participatory_process.id, name: { en: "My axis" })
    create(:subcategory, name: { en: "My action line" }, category_id: category.id)

    visit admin_categories_path
    select participatory_process.name, from: 'participatory_process_id'

    click_link "View strategic lines"

    expect(page).to have_content "My action line"

    first("a", text: "Edit").click

    fill_in "name_en", with: "My edited action line"

    click_button "Update strategic line"

    expect(page).to have_content "Subcategory updated successfully."
    expect(page).to have_content("My edited action line")
  end

  scenario "Delete an existing subcategory" do
    category = create(:category, participatory_process_id: participatory_process.id, name: { en: "My axis" })
    create(:subcategory, name: { en: "My action line" }, category_id: category.id)

    visit admin_categories_path
    select participatory_process.name, from: 'participatory_process_id'

    click_link "View strategic lines"
    sleep 1
    click_link "Delete"

    expect(page).to have_content "Subcategory deleted successfully."
    expect(page).to_not have_content("My action line")
  end

end
