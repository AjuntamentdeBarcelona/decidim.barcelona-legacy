# coding: utf-8
FactoryGirl.define do
  factory :participatory_process_attachment do
  end

  factory :newsletter do
    title do { I18n.default_locale => "Newsletter subject" } end
    body do {I18n.default_locale => "Newsletter body" } end
    sent_at nil

    trait :sent do
      sent_at Date.yesterday
    end
  end

  factory :action_plan_report do
    file "MyString"
  end

  sequence(:document_number) { |n| "#{n.to_s.rjust(8, '0')}X" }

  factory :user do
    sequence(:username) { |n| "Manuela#{n}" }
    sequence(:email)    { |n| "manuela#{n}@madrid.es" }

    password            'judgmentday'
    terms_of_service     '1'
    confirmed_at        { Time.now }
    hide_new_terms      true

    trait :incomplete_verification do
      after :create do |user|
        create(:failed_census_call, user: user)
      end
    end

    trait :level_two do
      residence_verified_at Time.now
      unconfirmed_phone "611111111"
      confirmed_phone "611111111"
      sms_confirmation_code "1234"
      document_type "dni"
      document_number
    end

    trait :level_three do
      verified_at Time.now
      document_type "dni"
      document_number
    end

    trait :hidden do
      hidden_at Time.now
    end

    trait :with_confirmed_hide do
      confirmed_hide_at Time.now
    end

    trait :administrator do
      roles ["administrator"]
    end

    trait :moderator do
      roles ["moderator"]
    end

    trait :reviewer do
      roles ["reviewer"]
    end

    trait :official do
      official_level 2
    end

    factory :administrator, traits: [:administrator]
    factory :moderator, traits: [:moderator]
  end

  factory :identity do
    user nil
    provider "Twitter"
    uid "MyString"
  end

  factory :activity do
    user
    action "hide"
    association :actionable, factory: :proposal
  end

  factory :verification_residence, class: Verification::Residence do
    user
    document_number
    document_type    "dni"
    date_of_birth    Date.new(1980, 12, 31)
    postal_code      "08011"
    terms_of_service '1'

    trait :invalid do
      postal_code "08011"
    end
  end

  factory :failed_census_call do
    user
    document_number
    document_type "dni"
    date_of_birth Date.new(1900, 1, 1)
    postal_code '28000'
  end

  factory :verification_sms, class: Verification::Sms do
    phone "699999999"
  end

  factory :verification_letter, class: Verification::Letter do
    user
    email 'user@madrid.es'
    password '1234'
    verification_code '5555'
  end

  factory :lock do
    user
    tries 0
    locked_until Time.now
  end

  factory :verified_user do
    document_number
    document_type    'dni'
  end

  factory :debate do
    participatory_process
    sequence(:title)     { |n| "Debate #{n} title" }
    description          'Debate description'
    instructions         'Debate instructions'
    terms_of_service     '1'
    starts_at { 1.hour.ago }
    ends_at { 1.hour.from_now }

    association :author, factory: :user

    trait :hidden do
      hidden_at Time.now
    end

    trait :with_ignored_flag do
      ignored_flag_at Time.now
    end

    trait :with_confirmed_hide do
      confirmed_hide_at Time.now
    end

    trait :flagged do
      after :create do |debate|
        Flag.flag(FactoryGirl.create(:user), debate)
      end
    end

    trait :with_hot_score do
      before(:save) { |d| d.calculate_hot_score }
    end

    trait :with_confidence_score do
      before(:save) { |d| d.calculate_confidence_score }
    end

    trait :conflictive do
      after :create do |debate|
        Flag.flag(FactoryGirl.create(:user), debate)
        4.times { create(:vote, votable: debate) }
      end
    end
  end

  factory :proposal do
    participatory_process
    sequence(:title)     { |n| "Proposal #{n} title" }
    summary              'In summary, what we want is...'
    description          'Proposal description'
    scope                'city'
    question             'Proposal question'
    external_url         'http://external_documention.es'
    video_url            'http://video_link.com'
    responsible_name     'John Snow'
    association :author, factory: :user
    association :category, factory: :category

    after(:build) do |proposal|
      proposal.subcategory = build(:subcategory, category_id: proposal.category_id)
    end

    trait :hidden do
      hidden_at Time.now
    end

    trait :with_ignored_flag do
      ignored_flag_at Time.now
    end

    trait :with_confirmed_hide do
      confirmed_hide_at Time.now
    end

    trait :flagged do
      after :create do |debate|
        Flag.flag(FactoryGirl.create(:user), debate)
      end
    end

    trait :with_hot_score do
      before(:save) { |d| d.calculate_hot_score }
    end

    trait :with_confidence_score do
      before(:save) { |d| d.calculate_confidence_score }
    end

    trait :conflictive do
      after :create do |debate|
        Flag.flag(FactoryGirl.create(:user), debate)
        4.times { create(:vote, votable: debate) }
      end
    end
  end

  factory :spending_proposal do
    sequence(:title)     { |n| "Spending Proposal #{n} title" }
    description          'Spend money on this'
    external_url         'http://external_documention.org'
    terms_of_service     '1'
    association :author, factory: :user
  end

  factory :vote do
    association :votable, factory: :debate
    association :voter,   factory: :user
    vote_flag true
    after(:create) do |vote, _|
      vote.votable.update_cached_votes
    end
  end

  factory :flag do
    association :flaggable, factory: :debate
    association :user, factory: :user
  end

  factory :comment do
    association :commentable, factory: :debate
    user
    sequence(:body) { |n| "Comment body #{n}" }

    trait :hidden do
      hidden_at Time.now
    end

    trait :with_ignored_flag do
      ignored_flag_at Time.now
    end

    trait :with_confirmed_hide do
      confirmed_hide_at Time.now
    end

    trait :flagged do
      after :create do |debate|
        Flag.flag(FactoryGirl.create(:user), debate)
      end
    end

    trait :with_confidence_score do
      before(:save) { |d| d.calculate_confidence_score }
    end
  end

  factory :organization do
    user
    responsible_name "Johnny Utah"
    sequence(:name) { |n| "org#{n}" }

    trait :verified do
      verified_at Time.now
    end

    trait :rejected do
      rejected_at Time.now
    end
  end

  factory :tag, class: 'ActsAsTaggableOn::Tag' do
    sequence(:name) { |n| "Tag #{n} name" }

    trait :featured do
      featured true
    end

    trait :unfeatured do
      featured false
    end
  end

  factory :setting do
    sequence(:key) { |n| "Setting Key #{n}" }
    sequence(:value) { |n| "Setting #{n} Value" }
  end

  factory :ahoy_event, :class => Ahoy::Event do
    id { SecureRandom.uuid }
    time DateTime.now
    sequence(:name) {|n| "Event #{n} type"}
  end

  factory :visit  do
    id { SecureRandom.uuid }
    started_at DateTime.now
  end

  factory :campaign do
    sequence(:name) { |n| "Campaign #{n}" }
    sequence(:track_id) { |n| "#{n}" }
  end

  factory :category do
    participatory_process
    sequence(:name) do |n|
      I18n.available_locales.inject({}) do |result, locale|
        result[locale.to_s] = "Axis #{n}"
        result
      end
    end

    sequence(:description) do |n|
      I18n.available_locales.inject({}) do |result, locale|
        result[locale.to_s] = "Description #{n}"
        result
      end
    end
  end

  factory :subcategory do
    participatory_process

    sequence(:name) do |n|
      I18n.available_locales.inject({}) do |result, locale|
        result[locale.to_s] = "Action Line #{n}"
        result
      end
    end

    sequence(:description) do |n|
      I18n.available_locales.inject({}) do |result, locale|
        result[locale.to_s] = "Description #{n}"
        result
      end
    end

    association :category, factory: :category
  end

  factory :notification do
    user
    association :notifiable, factory: :proposal
  end

  places = YAML.load_file("#{Rails.root}/db/seeds/places.yml")[:places]

  factory :meeting do
    participatory_process
    sequence(:title)       { |n| "Meeting #{n} title" }
    sequence(:description) { |n| "Meeting #{n} description" }
    held_at Date.today
    start_at Time.now
    end_at Time.now + 1.hour
    association :author, factory: :moderator
    association :category, factory: :category

    after :build do |meeting|
      place = places.sample
      meeting.address = place[:address]
      meeting.address_latitude = place[:lat]
      meeting.address_longitude = place[:lng]
      meeting.subcategory = build(:subcategory, category_id: meeting.category_id)
    end
  end

  factory :meeting_picture do
    file do
      Rack::Test::UploadedFile.new(
        File.join(Rails.root, 'spec', 'assets', "image.jpg")
      )
    end

    meeting
  end

  factory :geozone do
    sequence(:name) { |n| "District #{n}" }
  end

  factory :proposal_answer do
    proposal
    message "I'm totally agree with that"
    status "accepted"
  end

  factory :reference do
    referral_type "MyString"
    referral_id 1
    referenced_type "MyString"
    referenced_id 1
  end

  factory :follow do
    following{ create(:proposal, :debate).sample }
    follower{ create(:user) }
  end

  factory :action_plan do
    participatory_process
    category
    subcategory

    after :build do |action_plan|
      action_plan.revisions << create(:action_plan_revision)
    end
  end

  factory :action_plan_revision do
    sequence(:title)       { |n| "Revision #{n} title" }
    sequence(:description) { |n| "Revision #{n} description" }
  end

  factory :action_plan_statistics do
    action_plan
    related_proposals_count 1
    supports_count 1
    comments_count 1
    participants_count 1
    meeting_interventions_count 1
    interventions_count 1
  end

  factory :participatory_process do
    sequence(:name) { |n| "PAM #{n}" }
    admin_name "David"
    admin_email "david.morcillo@codegram.com"
    title do { :en => "Title", :es => "Título", :ca => "Títol" } end
    subtitle do { :en => "Subtitle", :es => "Subtítulo", :ca => "Subtítol" } end
    manager_group "Ajuntament"
    areas "Consell Municipal"
    summary do { :en => "Summary", :es => "Resumen", :ca => "Resum" } end
    description do { :en => "Description", :es => "Descripción", :ca => "Descripció" } end
    audience "Tota la població"
    citizenship_scope "Només poden opinar."
    published true
    featured true
    after(:create) do |participatory_process|
      create(:step, active: true, participatory_process: participatory_process)
    end
  end

  factory :step do
    sequence(:title) do |n| { en: "Step #{n}", es: "Paso #{n}", ca: "Pas #{n}" } end
    description do { en: "lorem ipsum lorem ipsum", es: "lorem ipsum lorem ipsum", ca: "lorem ipsum lorem ipsum" } end
    start_at Date.today
    end_at Date.today + 1.year
    flags Step::FLAGS.map(&:to_s) - ['proposals_readonly']
    participatory_process
  end
end
