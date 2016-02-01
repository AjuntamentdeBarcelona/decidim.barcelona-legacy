namespace :meetings do
  desc "Import meetings from a xls file given an url"
  task :import, [:url] => :environment do |task, args|
    if args.url.blank?
      puts "Usage: rake meetings:import[url]"
    else
      MeetingXLSImporter.new(open(args.url)).import
    end
  end
end
