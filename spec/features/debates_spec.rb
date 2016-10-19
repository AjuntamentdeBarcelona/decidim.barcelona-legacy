# coding: utf-8
require 'rails_helper'

feature 'Debates' do
  let!(:participatory_process) { create(:participatory_process) }

  before do
    Setting['feature.debates.search'] = true
  end

  scenario 'Index' do
    debates = [
      create(:debate, participatory_process: participatory_process),
      create(:debate, participatory_process: participatory_process)
    ]

    create(:debate)

    visit debates_path(participatory_process_id: participatory_process,
                       step_id: participatory_process.active_step)

    expect(page).to have_selector('#debates .debate', count: 2)
    debates.each do |debate|
      within('#debates') do
        expect(page).to have_css("a[href='#{debate_path(debate, participatory_process_id: debate.participatory_process, step_id: debate.participatory_process.active_step)}']", text: debate.title)
      end
    end
  end

  scenario 'Paginated Index' do
    per_page = Kaminari.config.default_per_page
    (per_page + 2).times { create(:debate, participatory_process: participatory_process) }

    visit debates_path(participatory_process_id: participatory_process,
                       step_id: participatory_process.active_step)

    expect(page).to have_selector('#debates .debate', count: per_page)

    within("ul.pagination") do
      expect(page).to have_content("1")
      expect(page).to have_content("2")
      expect(page).to_not have_content("3")
      click_link "Next", exact: false
    end

    expect(page).to have_selector('#debates .debate', count: 2)
  end

  scenario 'Show' do
    debate = create(:debate)

    visit debate_path(debate, participatory_process_id: debate.participatory_process,
                      step_id: debate.participatory_process.active_step)

    expect(page).to have_content debate.title
    expect(page).to have_content "Debate description"
    expect(page).to have_content "Debate instructions"
    expect(page).to have_content debate.author.name
    expect(page).to have_content I18n.l(debate.created_at.to_date)
    expect(page).to have_selector(avatar(debate.author.name))
    expect(page.html).to include "<title>#{debate.title}</title>"
  end

  xscenario 'Show: "Back" link directs to previous page', :js do
    debate = create(:debate, participatory_process: participatory_process, title: 'Test Debate 1')

    visit debates_path(participatory_process_id: participatory_process,
                       order: :hot_score, page: 1, step_id: participatory_process.active_step)
    first(:link, debate.title).click
    link_text = find_link('Go back')[:href]

    expect(link_text).to include(debates_path participatory_process_id: participatory_process,
                                              order: :hot_score, page: 1,
                                              step_id: participatory_process.active_step)
  end

  scenario 'Create', :js do
    author = create(:user, :official)
    login_as(author)

    visit new_debate_path(participatory_process_id: participatory_process,
                          step_id: participatory_process.active_step)
    fill_in 'debate_title', with: 'A title for a debate'
    fill_in_editor 'debate_description', with: 'This is very important because...'
    check 'debate_terms_of_service'

    click_button 'Start a debate'

    expect(page).to have_content 'A title for a debate'
    expect(page).to have_content 'Debate created successfully.'
    expect(page).to have_content 'This is very important because...'
    expect(page).to have_content author.name
    expect(page).to have_content I18n.l(Debate.last.created_at.to_date)
  end

  scenario 'Failed creation goes back to new showing featured tags', :js do
    featured_tag = create(:tag, :featured)
    tag = create(:tag)
    login_as(create(:user, :official))

    visit new_debate_path(participatory_process_id: participatory_process,
                          step_id: participatory_process.active_step)

    fill_in 'debate_title', with: ""
    fill_in_editor 'debate_description', with: 'Very important issue...'
    check 'debate_terms_of_service'

    click_button "Start a debate"

    expect(page).to_not have_content "Debate created successfully."
    expect(page).to have_content "error"
    within(".tags") do
      expect(page).to have_content featured_tag.name
      expect(page).to_not have_content tag.name
    end
  end

  scenario 'Errors on create' do
    author = create(:user, :official)
    login_as(author)

    visit new_debate_path(participatory_process_id: participatory_process,
                          step_id: participatory_process.active_step)

    click_button 'Start a debate'
    expect(page).to have_content error_message
  end

  scenario 'JS injection is prevented but safe html is respected', :js do
    author = create(:user, :official)
    login_as(author)

    visit new_debate_path(participatory_process_id: participatory_process,
                          step_id: participatory_process.active_step)

    fill_in 'debate_title', with: 'Testing an attack'
    fill_in_editor 'debate_description', with: '<p>This is <script>alert(\"an attack\");</script></p>'
    check 'debate_terms_of_service'

    click_button 'Start a debate'

    expect(page).to have_content 'Debate created successfully.'
    expect(page).to have_content 'Testing an attack'
    expect(page).to have_content 'This is alert("an attack")'
    expect(page).to_not have_selector('script')
  end

  scenario 'Autolinking is applied to description', :js do
    author = create(:user, :official)
    login_as(author)

    visit new_debate_path(participatory_process_id: participatory_process,
                          step_id: participatory_process.active_step)
    fill_in 'debate_title', with: 'Testing auto link'
    fill_in_editor 'debate_description', with: '<p>This is a link www.example.org</p>'
    check 'debate_terms_of_service'

    click_button 'Start a debate'

    expect(page).to have_content 'Debate created successfully.'
    expect(page).to have_content 'Testing auto link'
    expect(page).to have_link('www.example.org', href: 'http://www.example.org')
  end

  scenario 'JS injection is prevented but autolinking is respected', :js do
    author = create(:user, :official)
    login_as(author)

    visit new_debate_path(participatory_process_id: participatory_process,
                          step_id: participatory_process.active_step)

    fill_in 'debate_title', with: 'Testing auto link'
    fill_in_editor 'debate_description', with: "<script>alert('hey')</script> http://example.org"
    check 'debate_terms_of_service'

    click_button 'Start a debate'

    expect(page).to have_content 'Debate created successfully.'
    expect(page).to have_content 'Testing auto link'
    expect(page).to have_link('http://example.org', href: 'http://example.org')
    expect(page.html).to_not include "<script>alert('hey')</script>"
  end

  context 'Tagging debates' do
    let(:author) { create(:user, :official) }

    background do
      login_as(author)
    end

    scenario 'using featured tags', :js do
      ['Medio Ambiente', 'Ciencia'].each do |tag_name|
        create(:tag, :featured, name: tag_name)
      end

      visit new_debate_path(participatory_process_id: participatory_process,
                            step_id: participatory_process.active_step)

      fill_in 'debate_title', with: 'A super test'
      fill_in_editor 'debate_description', with: 'A super test'
      check 'debate_terms_of_service'

      ['Medio Ambiente', 'Ciencia'].each do |tag_name|
        find('.js-add-tag-link', text: tag_name).click
      end

      click_button 'Start a debate'

      expect(page).to have_content 'Debate created successfully.'
      ['Medio Ambiente', 'Ciencia'].each do |tag_name|
        expect(page).to have_content tag_name
      end
    end

    scenario 'using dangerous strings', :js do
      visit new_debate_path(participatory_process_id: participatory_process,
                            step_id: participatory_process.active_step)

      fill_in 'debate_title', with: 'A test of dangerous strings'
      fill_in_editor 'debate_description', with: 'A description suitable for this test'
      check 'debate_terms_of_service'

      fill_in 'debate_tag_list', with: 'user_id=1, &a=3, <script>alert("hey");</script>'

      click_button 'Start a debate'

      expect(page).to have_content 'Debate created successfully.'
      expect(page).to have_content 'user_id1'
      expect(page).to have_content 'a3'
      expect(page).to have_content 'scriptalert("hey");script'
      expect(page.html).to_not include 'user_id=1, &a=3, <script>alert("hey");</script>'
    end
  end

  scenario 'Update should not be posible if logged user is not the author' do
    debate = create(:debate)
    expect(debate).to be_editable
    login_as(create(:user, :official))

    visit edit_debate_path(debate, participatory_process_id: debate.
                                   participatory_process, step_id: participatory_process.active_step)

    expect(current_path).
      not_to eq(edit_debate_path(debate, participatory_process_id: debate.
                                         participatory_process, step_id: participatory_process.active_step))
    expect(page).to have_content "You do not have permission to carry out the action 'edit' on debate."
  end

  scenario 'Update should not be posible if debate is not editable' do
    debate = create(:debate)
    Setting["max_votes_for_debate_edit"] = 2
    3.times { create(:vote, votable: debate) }

    expect(debate).to_not be_editable
    login_as(debate.author)

    visit edit_debate_path(debate, participatory_process_id: debate.
                                   participatory_process, step_id: participatory_process.active_step)

    expect(current_path).
      not_to eq(edit_debate_path(debate, participatory_process_id: debate.
                                         participatory_process, step_id: participatory_process.active_step))
    expect(page).to have_content 'You do not have permission to'
  end

  scenario 'Update should be posible for the author of an editable debate', :js do
    debate = create(:debate)
    login_as(debate.author)

    visit edit_debate_path(debate, participatory_process_id: debate.participatory_process,
                           step_id: debate.participatory_process.active_step)
    expect(current_path).
      to eq(edit_debate_path(debate, participatory_process_id: debate.participatory_process,
                             step_id: debate.participatory_process.active_step))

    fill_in 'debate_title', with: "End child poverty"
    fill_in_editor 'debate_description', with: "Let's do something to end child poverty"

    click_button "Save changes"

    expect(page).to have_content "Debate updated successfully."
    expect(page).to have_content "End child poverty"
    expect(page).to have_content "Let's do something to end child poverty"
  end

  scenario 'Errors on update' do
    debate = create(:debate)
    login_as(debate.author)

    visit edit_debate_path(debate, participatory_process_id: debate.participatory_process,
                           step_id: debate.participatory_process.active_step)

    fill_in 'debate_title', with: ""
    click_button "Save changes"

    expect(page).to have_content error_message
  end

  scenario 'Failed update goes back to edit showing featured tags' do
    debate       = create(:debate)
    featured_tag = create(:tag, :featured)
    tag = create(:tag)
    login_as(debate.author)

    visit edit_debate_path(debate, participatory_process_id: debate.participatory_process,
                           step_id: debate.participatory_process.active_step)
    expect(current_path).
      to eq(edit_debate_path(debate, participatory_process_id: debate.participatory_process,
                             step_id: debate.participatory_process.active_step))

    fill_in 'debate_title', with: ""
    click_button "Save changes"

    expect(page).to_not have_content "Debate updated successfully."
    expect(page).to have_content "error"
    within(".tags") do
      expect(page).to have_content featured_tag.name
      expect(page).to_not have_content tag.name
    end
  end

  describe 'Limiting tags shown' do
    scenario 'Index page shows up to 5 tags per debate' do
      tag_list = ["Hacienda", "Economía", "Medio Ambiente", "Corrupción", "Fiestas populares", "Prensa"]
      create :debate, participatory_process: participatory_process, tag_list: tag_list

      visit debates_path(participatory_process_id: participatory_process,
                         step_id: participatory_process.active_step)

      within('.debate .tags') do
        expect(page).to have_content '1+'
      end
    end

    scenario 'Index page shows 3 tags with no plus link' do
      tag_list = ["Medio Ambiente", "Corrupción", "Fiestas populares"]
      create :debate, participatory_process: participatory_process, tag_list: tag_list

      visit debates_path(participatory_process_id: participatory_process,
                         step_id: participatory_process.active_step)

      within('.debate .tags') do
        tag_list.each do |tag|
          expect(page).to have_content tag
        end
        expect(page).not_to have_content '+'
      end
    end
  end

  xfeature 'Debate index order filters' do

    scenario 'Default order is hot_score', :js do
      create(:debate, participatory_process: participatory_process, title: 'Best').update_column(:hot_score, 10)
      create(:debate, participatory_process: participatory_process, title: 'Worst').update_column(:hot_score, 2)
      create(:debate, participatory_process: participatory_process, title: 'Medium').update_column(:hot_score, 5)

      visit debates_path(participatory_process_id: participatory_process,
                         step_id: participatory_process.active_step)

      expect('Best').to appear_before('Medium')
      expect('Medium').to appear_before('Worst')
    end

    scenario 'Debates are ordered by confidence_score', :js do
      create(:debate, participatory_process: participatory_process, title: 'Best').update_column(:confidence_score, 10)
      create(:debate, participatory_process: participatory_process, title: 'Worst').update_column(:confidence_score, 2)
      create(:debate, participatory_process: participatory_process, title: 'Medium').update_column(:confidence_score, 5)

      visit debates_path(participatory_process_id: participatory_process,
                         step_id: participatory_process.active_step)
      click_link 'highest rated'

      expect(page.find('.debate', match: :first)).to have_content('Best')

      within '#debates' do
        expect('Best').to appear_before('Medium')
        expect('Medium').to appear_before('Worst')
      end

      expect(current_url).to include('order=confidence_score')
      expect(current_url).to include('page=1')
    end

    scenario 'Debates are ordered by newest', :js do
      create(:debate, participatory_process: participatory_process, title: 'Best',   created_at: Time.now).update_column(:confidence_score, 1)
      create(:debate, participatory_process: participatory_process, title: 'Medium', created_at: Time.now - 1.hour).update_column(:confidence_score, 2)
      create(:debate, participatory_process: participatory_process, title: 'Worst',  created_at: Time.now - 1.day).update_column(:confidence_score, 3)

      visit debates_path(participatory_process_id: participatory_process,
                         order: "confidence_score", step_id: participatory_process.active_step)
      click_link 'newest'

      expect(page.find('.debate', match: :first)).to have_content('Best')

      within '#debates' do
        expect('Best').to appear_before('Medium')
        expect('Medium').to appear_before('Worst')
      end

      expect(current_url).to include('order=created_at')
      expect(current_url).to include('page=1')
    end
  end

  scenario 'Index tag does not show featured debates' do
    featured_debates = create_featured_debates
    debates = create(:debate, tag_list: "123")

    visit debates_path(participatory_process_id: participatory_process,
                       tag: "123", step_id: participatory_process.active_step)

    expect(page).to_not have_selector('#debates .debate-featured')
    expect(page).to_not have_selector('#featured-debates')
  end

  scenario 'Erased author' do
    user = create(:user)
    debate = create(:debate, participatory_process: participatory_process, author: user)
    user.erase

    visit debates_path(participatory_process_id: participatory_process,
                       step_id: participatory_process.active_step)
    expect(page).to have_content('User deleted')

    visit debate_path(debate, participatory_process_id: debate.
                              participatory_process, step_id: participatory_process.active_step)

    expect(page).to have_content('User deleted')
  end
end
