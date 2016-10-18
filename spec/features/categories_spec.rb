require 'rails_helper'

feature 'Categories' do
  let!(:participatory_process) { create(:participatory_process) }
  let!(:category1){ create(:category, participatory_process_id: participatory_process.id) }
  let!(:category2){ create(:category, participatory_process_id: participatory_process.id) }
  let!(:subcategory1){ create(:subcategory, category_id: category1.id, participatory_process_id: participatory_process.id) }
  let!(:subcategory2){ create(:subcategory, category_id: category2.id,  participatory_process_id: participatory_process.id) }

  scenario "Shows all the categories and subcategories" do
    visit categories_path(participatory_process_id: participatory_process,
                          step_id: participatory_process.active_step)

    [category1, category2].each do |category| 
      expect(page).to have_content category.name["en"]
      expect(page).to have_content category.description["en"]
    end

    [subcategory1, subcategory2].each do |subcategory| 
      expect(page).to have_content subcategory.name["en"]
      expect(page).to have_content subcategory.description["en"]
    end
  end
end
