# coding: utf-8
require 'rails_helper'

feature 'Proposals' do
  let!(:participatory_process) { create(:participatory_process) }
  let!(:category) { create(:category, participatory_process: participatory_process) }
  let!(:subcategory) { create(:subcategory, category: category, participatory_process: participatory_process) }

  before(:each) do
    Setting['feature.proposal_tags'] = true
    Setting['feature.proposal_video_url'] = true
  end

  scenario 'Index', :js do
    proposals = [
      create(:proposal, participatory_process: participatory_process),
      create(:proposal, participatory_process: participatory_process)
    ]
    create(:proposal)

    visit proposals_path

    expect(page).to have_selector('#proposals .proposal', count: 2)
    proposals.each do |proposal|
      within('#proposals') do
        expect(page).to have_content proposal.title
        expect(page).to have_xpath "//a[contains(@href,'#{proposal_path(proposal, participatory_process_id: participatory_process.slug)}')]"
      end
    end
  end

  xscenario 'Paginated Index', :js do
    per_page = 15
    (per_page + 5).times { create(:proposal) }

    visit proposals_path

    expect(page).to have_selector('#proposals .proposal', count: per_page)

    within("ul.pagination") do
      expect(page).to have_content("1")
      expect(page).to have_content("2")
      expect(page).to_not have_content("3")
      click_link "Next", exact: false
    end

    expect(page).to have_selector('#proposals .proposal', count: 5)
  end

  scenario 'Filtered Index', :js do
    proposals = [
      create(:proposal, participatory_process: participatory_process, title: 'Proposal with city scope 1', scope: 'city'),
      create(:proposal, participatory_process: participatory_process, title: 'Proposal with district scope', district: 1, scope: 'district'),
      create(:proposal, participatory_process: participatory_process, title: 'Proposal with city scope 2', scope: 'city')
    ]

    visit proposals_path

    check 'filter_scope_city'

    expect(page).not_to have_selector('.loading-component')
    expect(page).to have_selector('#proposals .proposal', count: 2)

    expect(page).to have_content 'Proposal with city scope 1'
    expect(page).to have_content 'Proposal with city scope 2'
    expect(page).to_not have_content 'Proposal with district scope'
  end

  scenario 'Show', :js do
    proposal = create(:proposal, participatory_process: participatory_process)

    visit proposal_path(proposal, participatory_process_id: proposal.participatory_process.slug)

    expect(page).to have_content proposal.title
    expect(page).to have_content "external_documention.es"
    expect(page).to have_content proposal.author.name
    expect(page).to have_content I18n.l(proposal.created_at.to_date)
    expect(page.html).to include "<title>#{proposal.title}</title>"

    expect(page).to have_selector('.share-buttons')

    within('.share-buttons') do
      expect(page.all('div.SocialMediaShareButton').count).to be(3) # Twitter, Facebook, Google+
    end
  end

  scenario 'Social Media Cards', :js do
    pending "not sure how to test meta injected by js"
    proposal = create(:proposal)

    visit proposal_path(proposal)
    expect(page).to have_css("#proposal_#{proposal.id}")
    expect(page.html).to include "<meta name=\"twitter:title\" content=\"#{proposal.title}\" />"
    expect(page.html).to include "<meta id=\"ogtitle\" property=\"og:title\" content=\"#{proposal.title}\"/>"
  end

  scenario 'Create', :js do
    author = create(:user)
    login_as(author)

    visit new_proposal_path

    fill_in 'proposal_title', with: 'Help refugees'
    fill_in 'proposal_summary', with: 'In summary, what we want is...'
    choose 'proposal_scope_district'
    select 'Ciutat Vella', from: 'proposal_district'
    fill_in 'proposal_external_url', with: 'http://rescue.org/refugees'
    fill_in 'proposal_video_url', with: 'http://youtube.com'
    fill_in 'proposal_responsible_name', with: 'Isabel Garcia'

    find('li', text: category.name["en"]).click
    find('li', text: subcategory.name["en"]).click

    click_button 'Create proposal'

    expect(page).to have_content 'Proposal created successfully.'
    expect(page).to have_content 'Help refugees'
    expect(page).to have_content 'In summary, what we want is...'
    expect(page).to have_content 'rescue.org/refugees'
    expect(page).to have_content author.name
    expect(page).to have_content I18n.l(Proposal.last.created_at.to_date)
  end

  scenario 'Responsible name is stored for anonymous users', :js do
    author = create(:user)

    login_as(author)

    visit new_proposal_path
    fill_in 'proposal_title', with: 'Help refugees'
    fill_in 'proposal_summary', with: 'In summary, what we want is...'
    fill_in 'proposal_external_url', with: 'http://rescue.org/refugees'
    fill_in 'proposal_responsible_name', with: 'Isabel Garcia'
    fill_in 'proposal_responsible_name', with: 'Isabel Garcia'
    find('li', text: category.name["en"]).click
    find('li', text: subcategory.name["en"]).click

    click_button 'Create proposal'

    expect(page).to have_content 'Proposal created successfully.'
    expect(Proposal.last.responsible_name).to eq('Isabel Garcia')
  end

  scenario 'Responsible name field is not shown for verified users', :js do
    author = create(:user, :level_two)
    login_as(author)

    visit new_proposal_path
    expect(page).to_not have_selector('#proposal_responsible_name')

    fill_in 'proposal_title', with: 'Help refugees'
    fill_in 'proposal_summary', with: 'In summary, what we want is...'
    fill_in 'proposal_external_url', with: 'http://rescue.org/refugees'
    find('li', text: category.name["en"]).click
    find('li', text: subcategory.name["en"]).click

    click_button 'Create proposal'

    expect(page).to have_content 'Proposal created successfully.'
  end

  xscenario 'Failed creation goes back to new showing featured tags', :js do
    featured_tag = create(:tag, :featured)
    tag = create(:tag)
    login_as(create(:user))

    visit new_proposal_path
    fill_in 'proposal_title', with: ""
    fill_in 'proposal_summary', with: 'In summary, what we want is...'
    fill_in 'proposal_external_url', with: 'http://rescue.org/refugees'
    fill_in 'proposal_responsible_name', with: 'Isabel Garcia'
    find('li', text: category.name["en"]).click
    find('li', text: subcategory.name["en"]).click

    click_button "Create proposal"

    expect(page).to_not have_content "Proposal created successfully."
    expect(page).to have_content "error"
    within(".tags") do
      expect(page).to have_content featured_tag.name
      expect(page).to_not have_content tag.name
    end
  end

  scenario 'Errors on create' do
    author = create(:user)
    login_as(author)

    visit new_proposal_path
    click_button 'Create proposal'
    expect(page).to have_content error_message
  end

  scenario 'JS injection is prevented but safe html is respected', :js do
    author = create(:user)

    login_as(author)

    visit new_proposal_path
    fill_in 'proposal_title', with: 'Testing an attack'
    fill_in 'proposal_summary', with: '<p>This is alert("an attack");</p>'
    fill_in 'proposal_external_url', with: 'http://rescue.org/refugees'
    fill_in 'proposal_responsible_name', with: 'Isabel Garcia'
    find('li', text: category.name["en"]).click
    find('li', text: subcategory.name["en"]).click

    click_button 'Create proposal'

    expect(page).to have_content 'Proposal created successfully.'
    expect(page).to have_content 'Testing an attack'
    expect(page.html).to include 'This is alert("an attack");'
    expect(page.html).to_not include '<script>alert("an attack");</script>'
  end

  scenario 'Autolinking is applied to summary', :js do
    author = create(:user)
    login_as(author)

    visit new_proposal_path
    fill_in 'proposal_title', with: 'Testing auto link'
    fill_in 'proposal_summary', with: 'This is a link http://www.example.org'
    fill_in 'proposal_responsible_name', with: 'Isabel Garcia'
    find('li', text: category.name["en"]).click
    find('li', text: subcategory.name["en"]).click

    click_button 'Create proposal'

    expect(page).to have_content 'Proposal created successfully.'
    expect(page).to have_content 'Testing auto link'
    expect(page).to have_link('example.org', href: 'http://www.example.org')
  end

  context 'Tagging proposals' do
    let(:author) { create(:user) }

    background do
      login_as(author)
    end

    xscenario 'using featured tags', :js do
      ['Medio Ambiente', 'Ciencia'].each do |tag_name|
        create(:tag, :featured, name: tag_name)
      end

      visit new_proposal_path

      fill_in 'proposal_title', with: 'A test with enough characters'
      fill_in 'proposal_summary', with: 'In summary, what we want is...'
      fill_in 'proposal_external_url', with: 'http://rescue.org/refugees'
      fill_in 'proposal_responsible_name', with: 'Isabel Garcia'
      find('li', text: category.name["en"]).click
      find('li', text: subcategory.name["en"]).click

      ['Medio Ambiente', 'Ciencia'].each do |tag_name|
        find('.js-add-tag-link', text: tag_name).click
      end

      click_button 'Create proposal'

      expect(page).to have_content 'Proposal created successfully.'
      ['Medio Ambiente', 'Ciencia'].each do |tag_name|
        expect(page).to have_content tag_name
      end
    end

    xscenario 'using dangerous strings', :js do
      visit new_proposal_path

      fill_in 'proposal_title', with: 'A test of dangerous strings'
      fill_in 'proposal_summary', with: 'In summary, what we want is...'
      fill_in 'proposal_external_url', with: 'http://rescue.org/refugees'
      fill_in 'proposal_responsible_name', with: 'Isabel Garcia'
      find('li', text: category.name["en"]).click
      find('li', text: subcategory.name["en"]).click

      fill_in 'proposal_tag_list', with: 'user_id=1, &a=3, <script>alert("hey");</script>'

      click_button 'Create proposal'

      expect(page).to have_content 'Proposal created successfully.'
      expect(page).to have_content 'user_id1'
      expect(page).to have_content 'a3'
      expect(page).to have_content 'scriptalert("hey");script'
      expect(page.html).to_not include 'user_id=1, &a=3, <script>alert("hey");</script>'
    end
  end

  scenario 'Update should not be posible if logged user is not the author' do
    proposal = create(:proposal)
    expect(proposal).to be_editable
    login_as(create(:user))

    visit edit_proposal_path(proposal, participatory_process_id: proposal.participatory_process.slug)
    expect(current_path).not_to eq(edit_proposal_path(proposal, participatory_process_id: proposal.participatory_process.slug))
    expect(page).to have_content 'You do not have permission'
  end

  scenario 'Update should not be posible if proposal is not editable' do
    proposal = create(:proposal, participatory_process: participatory_process)
    Setting["max_votes_for_proposal_edit"] = 10
    11.times { create(:vote, votable: proposal) }

    expect(proposal).to_not be_editable

    login_as(proposal.author)
    visit edit_proposal_path(proposal, participatory_process_id: proposal.participatory_process.slug)

    expect(current_path).not_to eq(edit_proposal_path(proposal, participatory_process_id: participatory_process.slug))
    expect(page).to have_content 'You do not have permission'
  end

  scenario 'Update should be posible for the author of an editable proposal', :js do
    proposal = create(:proposal)
    login_as(proposal.author)

    visit edit_proposal_path(proposal, participatory_process_id: proposal.participatory_process.slug)
    expect(current_path).to eq(edit_proposal_path(proposal, participatory_process_id: proposal.participatory_process.slug))

    fill_in 'proposal_title', with: "End child poverty"
    fill_in 'proposal_summary', with: 'Basically...'
    fill_in 'proposal_external_url', with: 'http://rescue.org/refugees'
    fill_in 'proposal_responsible_name', with: 'Isabel Garcia'

    click_button "Save changes"

    expect(page).to have_content "Proposal updated successfully."
    expect(page).to have_content "Basically..."
    expect(page).to have_content "End child poverty"
  end

  scenario 'Errors on update' do
    proposal = create(:proposal)
    login_as(proposal.author)

    visit edit_proposal_path(proposal, participatory_process_id: proposal.participatory_process.slug)
    fill_in 'proposal_title', with: ""
    click_button "Save changes"

    expect(page).to have_content error_message
  end

  xscenario 'Failed update goes back to edit showing featured tags' do
    proposal       = create(:proposal)
    featured_tag = create(:tag, :featured)
    tag = create(:tag)
    login_as(proposal.author)

    visit edit_proposal_path(proposal)
    expect(current_path).to eq(edit_proposal_path(proposal))

    fill_in 'proposal_title', with: ""
    click_button "Save changes"

    expect(page).to_not have_content "Proposal updated successfully."
    expect(page).to have_content "error"
    within(".tags") do
      expect(page).to have_content featured_tag.name
      expect(page).to_not have_content tag.name
    end
  end

  describe 'Limiting tags shown' do
    xscenario 'Index page shows up to 5 tags per proposal' do
      tag_list = ["Hacienda", "Economía", "Medio Ambiente", "Corrupción", "Fiestas populares", "Prensa"]
      create :proposal, tag_list: tag_list

      visit proposals_path

      within('.proposal .tags') do
        expect(page).to have_content '1+'
      end
    end

    xscenario 'Index page shows 3 tags with no plus link' do
      tag_list = ["Medio Ambiente", "Corrupción", "Fiestas populares"]
      create :proposal, tag_list: tag_list

      visit proposals_path

      within('.proposal .tags') do
        tag_list.each do |tag|
          expect(page).to have_content tag
        end
        expect(page).not_to have_content '+'
      end
    end
  end

  feature 'Proposal index order filters' do

    scenario 'Proposals are ordered by confidence_score', :js do
      create(:proposal, participatory_process: participatory_process, title: 'Best proposal').update_column(:confidence_score, 10)
      create(:proposal, participatory_process: participatory_process, title: 'Worst proposal').update_column(:confidence_score, 2)
      create(:proposal, participatory_process: participatory_process, title: 'Medium proposal').update_column(:confidence_score, 5)

      visit proposals_path

      page.find('.submenu .confidence_score').click
      expect(page).not_to have_selector('.loading-component')

      expect(page.find('.proposal', match: :first)).to have_content('Best proposal')

      within '#proposals' do
        expect('Best proposal').to appear_before('Medium proposal')
        expect('Medium proposal').to appear_before('Worst proposal')
      end

      expect(current_url).to include('order=confidence_score')
    end

    scenario 'Proposals are ordered by newest', :js do
      create(:proposal, participatory_process: participatory_process, title: 'Best proposal',   created_at: Time.now).update_column(:confidence_score, 1)
      create(:proposal, participatory_process: participatory_process, title: 'Medium proposal', created_at: Time.now - 1.hour).update_column(:confidence_score, 2)
      create(:proposal, participatory_process: participatory_process, title: 'Worst proposal',  created_at: Time.now - 1.day).update_column(:confidence_score, 3)

      visit proposals_path(order: "confidence_score")

      page.find('.submenu .created_at').click
      expect(page).not_to have_selector('.loading-component')

      expect(page.find('.proposal', match: :first)).to have_content('Best proposal')

      within '#proposals' do
        expect('Best proposal').to appear_before('Medium proposal')
        expect('Medium proposal').to appear_before('Worst proposal')
      end

      expect(current_url).to include('order=created_at')
    end

    scenario 'Proposals source tabs filter', :js do
      create(:proposal, participatory_process: participatory_process, title: 'Proposal no oficial 1')
      create(:proposal, participatory_process: participatory_process, title: 'Proposal no oficial 2')
      create(:proposal, participatory_process: participatory_process, title: 'Proposal oficial 1', official: true)
      create(:proposal, participatory_process: participatory_process, title: 'Proposal oficial 2', official: true)

      visit proposals_path

      find('.filter-tabs a', text: 'Town Hall').click

      within '#proposals' do
        expect(page).to_not have_content("Proposal no oficial 1")
        expect(page).to_not have_content("Proposal no oficial 2")
        expect(page).to have_content("Proposal oficial 1")
        expect(page).to have_content("Proposal oficial 2")
      end
    end
  end

  context "Search" do

    context "Basic search" do

      scenario 'Search by text', :js do
        proposal1 = create(:proposal, participatory_process: participatory_process, title: "Get Schwifty")
        proposal2 = create(:proposal, participatory_process: participatory_process, title: "Schwifty Hello")
        proposal3 = create(:proposal, participatory_process: participatory_process, title: "Do not show me")

        visit proposals_path

        find('.proposal-filters .search-filter').set("Schwifty")

        within("#proposals") do
          expect(page).to have_css('.proposal', count: 2)

          expect(page).to have_content(proposal1.title)
          expect(page).to have_content(proposal2.title)
          expect(page).to_not have_content(proposal3.title)
        end
      end
    end

    scenario "Reorder results maintaing search", :js do
      proposal1 = create(:proposal, participatory_process: participatory_process, title: "Show you got",      cached_votes_up: 10,  created_at: 1.week.ago)
      proposal2 = create(:proposal, participatory_process: participatory_process, title: "Show what you got", cached_votes_up: 1,   created_at: 1.month.ago)
      proposal3 = create(:proposal, participatory_process: participatory_process, title: "Show you got",      cached_votes_up: 100, created_at: Time.now)
      proposal4 = create(:proposal, participatory_process: participatory_process, title: "Do not display",    cached_votes_up: 1,   created_at: 1.week.ago)

      visit proposals_path

      find('.proposal-filters .search-filter').set("Show what you got")
      sleep 1 # Debounce

      expect(page).to_not have_content "Do not display"

      page.find('.submenu .created_at').click
      expect(page).not_to have_selector('.loading-component')

      expect(page.find('.proposal', match: :first)).to have_content('Show you got')

      within("#proposals") do
        expect(all(".proposal")[0].text).to match "Show you got"
        expect(all(".proposal")[1].text).to match "Show you got"
        expect(all(".proposal")[2].text).to match "Show what you got"
      end
    end

    scenario 'After a search do not show featured proposals', :js do
      proposal = create(:proposal, title: "Abcdefghi")

      visit proposals_path

      find('.proposal-filters .search-filter').set(proposal.title)

      expect(page).to_not have_selector('#proposals .proposal-featured')
      expect(page).to_not have_selector('#featured-proposals')
    end

  end

  scenario 'Index tag does not show featured proposals' do
    proposal = create(:proposal, tag_list: "123")

    visit proposals_path(tag: "123")

    expect(page).to_not have_selector('#proposals .proposal-featured')
    expect(page).to_not have_selector('#featured-proposals')
  end

  scenario 'Conflictive', :js do
    good_proposal = create(:proposal)
    conflictive_proposal = create(:proposal, :conflictive)

    visit proposal_path(conflictive_proposal, participatory_process_id: conflictive_proposal.participatory_process.slug)
    expect(page).to have_content "This proposal has been flagged as inappropriate by several users."

    visit proposal_path(good_proposal, participatory_process_id: good_proposal.participatory_process.slug)
    expect(page).to_not have_content "This proposal has been flagged as inappropriate by several users."
  end

  scenario "Flagging", :js do
    user = create(:user)
    proposal = create(:proposal)

    login_as(user)
    visit proposal_path(proposal, participatory_process_id: proposal.participatory_process.slug)

    expect(page).to have_selector("#proposal_#{proposal.id}")
    page.find("#flag-action-#{proposal.id}").click
    expect(page).to have_selector("#unflag-action-#{proposal.id}")

    expect(Flag.flagged?(user, proposal)).to be
  end

  scenario "Unflagging", :js do
    user = create(:user)
    proposal = create(:proposal)
    Flag.flag(user, proposal)

    login_as(user)
    visit proposal_path(proposal, participatory_process_id: proposal.participatory_process.slug)

    expect(page).to have_selector("#proposal_#{proposal.id}")
    page.find("#unflag-action-#{proposal.id}").click

    expect(page).to have_css("#flag-action-#{proposal.id}")

    expect(Flag.flagged?(user, proposal)).to_not be
  end

  scenario "Follow", :js do
    user = create(:user)
    proposal = create(:proposal)
    login_as(user)
    visit proposal_path(proposal, participatory_process_id: proposal.participatory_process.slug)
    expect(page).to have_selector("#proposal_#{proposal.id}")

    page.find("button", text: "Follow").click

    expect(page).to have_selector("button", text: "Unfollow")
  end

  scenario "Unollow", :js do
    user = create(:user)
    proposal = create(:proposal)
    Follow.create({ follower_id: user.id, following_id: proposal.id, following_type: 'Proposal' })
    login_as(user)
    visit proposal_path(proposal, participatory_process_id: proposal.participatory_process.slug)
    expect(page).to have_selector("#proposal_#{proposal.id}")

    page.find("button", text: "Unfollow").click

    expect(page).to have_selector("button", text: "Follow")
  end
end
