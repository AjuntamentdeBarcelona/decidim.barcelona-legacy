namespace :exporter do
  task :all do
    Rake::Task["exporter:users"].invoke
    Rake::Task["exporter:user_groups"].invoke
    Rake::Task["exporter:processes"].invoke
    Rake::Task["exporter:scopes"].invoke
    Rake::Task["exporter:categories"].invoke
    Rake::Task["exporter:proposals"].invoke
    Rake::Task["exporter:proposal_votes"].invoke
    Rake::Task["exporter:meetings"].invoke
    Rake::Task["exporter:meeting_attachments"].invoke
  end
end
