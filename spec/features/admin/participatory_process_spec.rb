# coding: utf-8
require 'rails_helper'

feature 'Admin participatory processes' do
  background do
    admin = create(:administrator)
    login_as(admin)
  end

  scenario "Can create new participatory processes", :js do
    visit admin_participatory_processes_path

    click_link "Create participatory process"

    fill_in "name", with: "pam"

    fill_in "admin_name", with: "David"
    fill_in "admin_email", with: "david.morcillo@codegram.com"

    fill_in "title_ca", with: "PAM (ca)"
    fill_in "title_es", with: "PAM (es)"
    fill_in "title_en", with: "PAM (en)"

    fill_in "subtitle_ca", with: "PAM subtitle (ca)"
    fill_in "subtitle_es", with: "PAM subtitle (es)"
    fill_in "subtitle_en", with: "PAM subtitle (en)"

    fill_in "manager_group", with: "Ajuntament"
    fill_in "areas", with: "Consell Municipal"

    fill_in_editor "summary_ca", with: "Breu descripcio del PAM"
    fill_in_editor "summary_es", with: "Breve descripción del PAM"
    fill_in_editor "summary_en", with: "PAM's brief description'"

    fill_in_editor "description_ca", with: "Descripcio del PAM"
    fill_in_editor "description_es", with: "Descripción del PAM"
    fill_in_editor "description_en", with: "PAM's description'"

    fill_in "audience", with: "Tota la població."
    fill_in "citizenship_scope", with: "Només poden opinar."

    click_button "Create participatory process"

    expect(page).to have_content "Participatory process created successfully."
  end 
end