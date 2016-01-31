namespace :meetings do
  desc "Import meetings from a xls file given an url"
  task :import, [:url] => :environment do |task, args|
    if args.url.blank?
      puts "Usage: rake meetings:import[url]"
    else
      MeetingXLSImporter.new(open(args.url)).import
    end
  end

  desc "Import meetings from a xls file given an url"
  task :import_local, [:file] => :environment do |task, args|
    if args.url.blank?
      puts "Usage: rake meetings:import_local[file]"
    else
      MeetingXLSImporter.new(open(args.file)).import
    end
  end
end
