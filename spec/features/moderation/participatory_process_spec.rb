# coding: utf-8
require 'rails_helper'

feature 'Moderate participatory processes' do
  background do
    moderator = create(:moderator)
    login_as(moderator)
  end

  scenario "Can create new participatory processes", :js do
    visit moderation_participatory_processes_path

    click_link "Create participatory process"

    fill_in "participatory_process_name", with: "pam"

    attach_file "participatory_process_full_image", "#{Rails.root}/spec/fixtures/participatory_process_full_image_example.jpg"
    attach_file "participatory_process_banner_image", "#{Rails.root}/spec/fixtures/participatory_process_banner_image_example.jpg"

    fill_in "participatory_process_admin_name", with: "David"
    fill_in "participatory_process_admin_email", with: "david.morcillo@codegram.com"

    fill_in "participatory_process_title_ca", with: "PAM (ca)"
    fill_in "participatory_process_title_es", with: "PAM (es)"
    fill_in "participatory_process_title_en", with: "PAM (en)"

    fill_in "participatory_process_subtitle_ca", with: "PAM subtitle (ca)"
    fill_in "participatory_process_subtitle_es", with: "PAM subtitle (es)"
    fill_in "participatory_process_subtitle_en", with: "PAM subtitle (en)"

    fill_in "participatory_process_manager_group", with: "Ajuntament"
    fill_in "participatory_process_areas", with: "Consell Municipal"

    fill_in_editor "participatory_process_summary_ca", with: "Breu descripcio del PAM"
    fill_in_editor "participatory_process_summary_es", with: "Breve descripción del PAM"
    fill_in_editor "participatory_process_summary_en", with: "PAM's brief description'"

    fill_in_editor "participatory_process_description_ca", with: "Descripcio del PAM"
    fill_in_editor "participatory_process_description_es", with: "Descripción del PAM"
    fill_in_editor "participatory_process_description_en", with: "PAM's description'"

    fill_in "participatory_process_audience", with: "Tota la població."
    fill_in "participatory_process_citizenship_scope", with: "Només poden opinar."

    click_button "Create participatory process"

    expect(page).to have_content "Participatory process created successfully."
    expect(page).to have_content "pam"
    expect(page).to have_content "/pam"
  end

  scenario "Show an existing participatory process", :js do
    participatory_process = create(:participatory_process, name: "test")

    visit moderation_participatory_processes_path
    within all("li").last do
      click_link "Show"
    end
    expect(page).to have_content "pam"
    expect(page).to have_content "Editar proceso participativo"
  end

  scenario "Edit an existing participatory process", :js do
    participatory_process = create(:participatory_process, name: "test")

    visit moderation_participatory_processes_path
    within all("li").last do
      click_link "Edit"
    end
    fill_in "participatory_process_name", with: "pam"
    click_button "Update participatory process"

    expect(page).to have_content "Participatory process updated successfully."
    expect(page).to have_content "pam"
    expect(page).to have_content "/test"
  end

  scenario "Destroy an existing participatory process", :js do
    participatory_process = create(:participatory_process, name: "test")
    visit moderation_participatory_processes_path
    within all("li").last do
      click_link "Delete"
    end

    expect(page).to have_content "Restore"
  end

  scenario "Restore a deleted participatory process", :js do
    participatory_process = create(:participatory_process, name: "test")
    participatory_process.destroy

    visit moderation_participatory_processes_path
    click_link "Restore"

    expect(page).to_not have_content "Restore"
  end

  scenario "Publish a participatory process", :js do
    create(:participatory_process, name: "test", published: false)

    visit moderation_participatory_processes_path

    click_link "Unpublished"
    click_link "Publish"

    expect(page).to have_css(".sub-nav .active span", text: "Published")
    expect(page).to have_content("test")
    expect(page).to_not have_css("a", text: "Publish")
  end
  
  scenario "Unpublish a participatory process", :js do
    ParticipatoryProcess.delete_all
    create(:participatory_process, name: "test", published: true)

    visit moderation_participatory_processes_path

    click_link "Unpublish"

    expect(page).to have_css(".sub-nav .active span", text: "Unpublished")
    expect(page).to have_content("test")
    expect(page).to have_css("a", text: "Publish")
  end
end
