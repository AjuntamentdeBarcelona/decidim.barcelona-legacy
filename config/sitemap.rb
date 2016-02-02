# Set the host name for URL creation
SitemapGenerator::Sitemap.default_host = "#{!ENV["FORCE_SSL"].blank? ? "https" : "http"}://#{ENV["SERVER_NAME"]}"

SitemapGenerator::Sitemap.create(verbose: true) do
  # Add meetings pages
  Meeting.all.each { |meeting| add meeting_path(meeting), lastmod: meeting.updated_at }
  # Add proposals pages
  Proposal.all.each { |proposal| add proposal_path(proposal), lastmod: proposal.updated_at }
  # Add static pages
  add categories_path
  add page_path('more_information')
end
