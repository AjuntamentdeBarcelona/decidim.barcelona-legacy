namespace :exporter do
  task :all do
    Rake::Task["exporter:users"].invoke
    Rake::Task["exporter:user_groups"].invoke
  end
end
