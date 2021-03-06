# coding: utf-8
# Default admin user (change password after first deploy to a server!)
if User.administrators.count == 0 && !Rails.env.test?
  admin = User.create!(username: 'admin', email: 'admin@bcn.cat',
                       password: '12345678', password_confirmation: '12345678',
                       confirmed_at: Time.now, terms_of_service: "1", roles: ["administrator"])
end

if ENV["SEED"]
  puts "Creating Geozones"
  ('A'..'Z').each{ |i| Geozone.create(name: "District #{i}") }

  def create_user(email, username = Faker::Name.name, roles = [])
    pwd = '12345678'
    puts "    #{username}"
    User.create!(username: username, email: email, password: pwd,
                 password_confirmation: pwd, confirmed_at: Time.now,
                 terms_of_service: "1", roles: [])
  end

  puts "Creating users"
  moderator = create_user('mod@bcn.cat', 'mod', ["moderator"])

  (1..10).each do |i|
    org_name = Faker::Company.name
    org_user = create_user("org#{i}@bcn.cat", org_name)
    org_responsible_name = Faker::Name.name
    org = org_user.create_organization(name: org_name, responsible_name: org_responsible_name)

    verified = [true, false].sample
    if verified then
      org.verify
    else
      org.reject
    end
  end

  (1..5).each do |i|
    official = create_user("official#{i}@bcn.cat")
    official.update(official_level: i)
  end

  (1..40).each do |i|
    user = create_user("user#{i}@bcn.cat")
    level = [1,2,3].sample
    if level >= 2 then
      user.update(residence_verified_at: Time.now, confirmed_phone: Faker::PhoneNumber.phone_number, document_number: Faker::Number.number(10), document_type: "1" )
    end
    if level == 3 then
      user.update(verified_at: Time.now, document_number: Faker::Number.number(10) )
    end
  end

  org_user_ids = User.organizations.pluck(:id)
  not_org_users = User.where(['users.id NOT IN(?)', org_user_ids])

  puts "Creating Debates"

  tags = Faker::Lorem.words(25)

  (1..30).each do |i|
    author = User.reorder("RANDOM()").first
    description = "<p>#{Faker::Lorem.paragraphs.join('</p><p>')}</p>"
    starts_at = (-30..30).to_a.sample.days.from_now
    debate = Debate.create!(author: author,
                            title: Faker::Lorem.sentence(3).truncate(60),
                            starts_at: starts_at,
                            ends_at: (starts_at + 2.hours),
                            created_at: rand((Time.now - 1.week) .. Time.now),
                            description: description,
                            tag_list: tags.sample(3).join(','),
                            terms_of_service: "1")
    puts "    #{debate.title}"
  end

  puts "Creating Axis, Action Lines and Goals"
  (1..5).each do |n|
    name = "Axis #{n}"
    description = "<p>#{Faker::Lorem.paragraphs.join('</p><p>')}</p>"
    category = Category.create(name: { ca: name, es: name, en: name }, description: { ca: description, es: description, en: description }, position: n)
    (1..5).each do |m|
      name = "Action line #{n}#{m}"
      description = "<p>#{Faker::Lorem.paragraphs.join('</p><p>')}</p>"
      Subcategory.create(name: { ca: name, es: name, en: name }, description: { ca: description, es: description, en: description }, category_id: category.id, position: m)
    end
  end

  puts "Creating Proposals"

  tags = Faker::Lorem.words(25)

  (1..150).each do |i|
    author = User.reorder("RANDOM()").first
    description = "<p>#{Faker::Lorem.paragraphs.join('</p><p>')}</p>"
    subcategory = Subcategory.offset(rand(Subcategory.count)).first

    if [true, false].sample
      scope = 'district'
      district = District.all.map(&:id).sample
    else
      scope = 'city'
      district = nil
    end

    # 25% of the proposals are official
    official = [true, false, false, false].sample

    proposal = Proposal.create!(author: author,
                                title: Faker::Lorem.paragraph.truncate(150),
                                question: Faker::Lorem.sentence(3),
                                summary: Faker::Lorem.paragraph(10).truncate(1000),
                                responsible_name: Faker::Name.name,
                                external_url: Faker::Internet.url,
                                description: description,
                                created_at: rand((Time.now - 1.week) .. Time.now),
                                tag_list: tags.sample(3).join(','),
                                subcategory: subcategory,
                                category: subcategory.category,
                                scope: scope,
                                district: district,
                                official: official)
    puts "    #{proposal.title}"
  end

  puts "Creating Meetings"

  places = YAML.load_file("#{Rails.root}/db/seeds/places.yml")[:places]
  proposals = Proposal.all

  (1..1000).each do |i|
    place = places.sample
    start_at = Faker::Time.forward(23, :morning)

    subcategory = Subcategory.offset(rand(Subcategory.count)).first

    if [true, false].sample
      scope = 'district'
      district = District.all.map(&:id).sample
    else
      scope = 'city'
      district = nil
    end

    meeting = Meeting.create!(
      author: moderator,
      title: Faker::Lorem.sentence(3).truncate(60),
      description: Faker::Lorem.sentence(3),
      address: place[:address],
      address_latitude: place[:lat],
      address_longitude: place[:lng],
      held_at: Faker::Date.between(30.days.ago, 30.days.from_now),
      start_at: start_at, 
      end_at: start_at + ((1..5).to_a.sample).hours,
      tag_list: tags.sample(3).join(','),
      subcategory: subcategory,
      category: subcategory.category,
      scope: scope,
      district: district,
      proposal_ids: proposals.sample(3).collect(&:id)
    )
    puts "    #{meeting.title}"
  end
  
  puts "Commenting Debates"

  (1..100).each do |i|
    author = User.reorder("RANDOM()").first
    debate = Debate.reorder("RANDOM()").first
    Comment.create!(user: author,
                    created_at: rand(debate.created_at .. Time.now),
                    commentable: debate,
                    alignment: [-1, 0, 1].sample,
                    body: Faker::Lorem.sentence)
  end


  puts "Commenting Proposals"

  (1..100).each do |i|
    author = User.reorder("RANDOM()").first
    proposal = Proposal.reorder("RANDOM()").first
    Comment.create!(user: author,
                    created_at: rand(proposal.created_at .. Time.now),
                    commentable: proposal,
                    alignment: [-1, 0, 1].sample,
                    body: Faker::Lorem.sentence)
  end


  puts "Commenting Comments"

  (1..200).each do |i|
    author = User.reorder("RANDOM()").first
    parent = Comment.reorder("RANDOM()").first
    Comment.create!(user: author,
                    created_at: rand(parent.created_at .. Time.now),
                    commentable_id: parent.commentable_id,
                    commentable_type: parent.commentable_type,
                    body: Faker::Lorem.sentence,
                    parent: parent)
  end


  puts "Voting Debates, Proposals & Comments"

  (1..100).each do |i|
    voter  = not_org_users.reorder("RANDOM()").first
    vote   = [true, false].sample
    debate = Debate.reorder("RANDOM()").first
    debate.vote_by(voter: voter, vote: vote)
  end

  (1..100).each do |i|
    voter  = not_org_users.reorder("RANDOM()").first
    vote   = [true, false].sample
    comment = Comment.reorder("RANDOM()").first
    comment.vote_by(voter: voter, vote: vote)
  end

  User.level_two_or_three_verified.each do |voter|
    (1..100).each do |i|
      proposal = Proposal.reorder("RANDOM()").first
      proposal.vote_by(voter: voter, vote: true)
    end
  end


  puts "Flagging Debates & Comments"

  (1..40).each do |i|
    debate = Debate.reorder("RANDOM()").first
    flagger = User.where(["users.id <> ?", debate.author_id]).reorder("RANDOM()").first
    Flag.flag(flagger, debate)
  end

  (1..40).each do |i|
    comment = Comment.reorder("RANDOM()").first
    flagger = User.where(["users.id <> ?", comment.user_id]).reorder("RANDOM()").first
    Flag.flag(flagger, comment)
  end

  (1..40).each do |i|
    proposal = Proposal.reorder("RANDOM()").first
    flagger = User.where(["users.id <> ?", proposal.author_id]).reorder("RANDOM()").first
    Flag.flag(flagger, proposal)
  end

  puts "Creating Spending Proposals"

  resolutions = ["accepted", "rejected", nil]

  (1..30).each do |i|
    geozone = Geozone.reorder("RANDOM()").first
    author = User.reorder("RANDOM()").first
    description = "<p>#{Faker::Lorem.paragraphs.join('</p><p>')}</p>"
    spending_proposal = SpendingProposal.create!(author: author,
                                                 title: Faker::Lorem.sentence(3).truncate(60),
                                                 external_url: Faker::Internet.url,
                                                 description: description,
                                                 created_at: rand((Time.now - 1.week) .. Time.now),
                                                 resolution: resolutions.sample,
                                                 geozone: [geozone, nil].sample,
                                                 terms_of_service: "1")
    puts "    #{spending_proposal.title}"
  end

  puts "Ignoring flags in Debates, comments & proposals"

  Debate.flagged.reorder("RANDOM()").limit(10).each(&:ignore_flag)
  Comment.flagged.reorder("RANDOM()").limit(30).each(&:ignore_flag)
  Proposal.flagged.reorder("RANDOM()").limit(10).each(&:ignore_flag)


  puts "Hiding debates, comments & proposals"

  Comment.with_hidden.flagged.reorder("RANDOM()").limit(30).each(&:hide)
  Debate.with_hidden.flagged.reorder("RANDOM()").limit(5).each(&:hide)
  Proposal.with_hidden.flagged.reorder("RANDOM()").limit(10).each(&:hide)


  puts "Confirming hiding in debates, comments & proposals"

  Comment.only_hidden.flagged.reorder("RANDOM()").limit(10).each(&:confirm_hide)
  Debate.only_hidden.flagged.reorder("RANDOM()").limit(5).each(&:confirm_hide)
  Proposal.only_hidden.flagged.reorder("RANDOM()").limit(5).each(&:confirm_hide)

  (0..6).each do |i|
    pp = ParticipatoryProcess.create!(name: Faker::Lorem.sentence(3).truncate(60),
                                      admin_name: Faker::Name.name,
                                      admin_email: Faker::Internet.email,
                                      areas: Faker::Lorem.sentence(3).truncate(60),
                                      title: {
                                        es: Faker::Lorem.sentence(3).truncate(60),
                                        en: Faker::Lorem.sentence(3).truncate(60),
                                        ca: Faker::Lorem.sentence(3).truncate(60)
                                      },
                                      subtitle: {
                                        es: Faker::Lorem.sentence(3).truncate(60),
                                        en: Faker::Lorem.sentence(3).truncate(60),
                                        ca: Faker::Lorem.sentence(3).truncate(60)

                                      },
                                      summary: { 
                                        es: "<p>#{Faker::Lorem.paragraphs.join('</p><p>')}</p>",
                                        en: "<p>#{Faker::Lorem.paragraphs.join('</p><p>')}</p>",
                                        ca: "<p>#{Faker::Lorem.paragraphs.join('</p><p>')}</p>"
                                      },
                                      description: { 
                                        es: "<p>#{Faker::Lorem.paragraphs.join('</p><p>')}</p>",
                                        en: "<p>#{Faker::Lorem.paragraphs.join('</p><p>')}</p>",
                                        ca: "<p>#{Faker::Lorem.paragraphs.join('</p><p>')}</p>"
                                      },
                                      citizenship_scope: Faker::Lorem.sentence(3).truncate(60),
                                      audience: Faker::Lorem.sentence(3).truncate(60),
                                      manager_group: Faker::Lorem.sentence(3).truncate(60),
                                      published: true)
    puts "#{pp.title}"

    pp.steps.create(
      position: 0,
      title: {es: "Diagnostico", ca: "Diagnostic", en: "Diagnostic"},
      description: {es: "Fase de diagnostico", en: "Diagnostic phase", ca: "Diagnostico"},
      start_at: "2016-10-01", 
      end_at: "2016-10-31", 
      flags: ["meetings", "debates"]
    )

    pp.steps.create(
      position: 1,
      title: {es: "Aportaciones", ca: "Aportaciones", en: "Aportaciones"},
      description: {es: "Fase de Aportaciones", en: "Aportaciones phase", ca: "Aportaciones"},
      start_at: "2016-11-01", 
      end_at: "2016-11-30", 
      flags: ["proposals"]
    )

    pp.steps.create(
      position: 1,
      title: {es: "Respuestas", ca: "Respuestas", en: "Respuestas"},
      description: {es: "Fase de Respuestas", en: "Respuestas phase", ca: "Respuestas"},
      start_at: "2016-12-01", 
      end_at: "2016-12-31", 
      flags: ["action_plans"]
    )
  end

end
