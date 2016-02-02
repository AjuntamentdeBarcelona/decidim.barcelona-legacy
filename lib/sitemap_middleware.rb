class SitemapMiddleware
  def initialize(app)
    @app = app
  end

  def call(env)
    if env['PATH_INFO'] == '/sitemap.xml'
      generate_sitemap
      response = Rack::Response.new
      response.header['Content-Type'] = 'text/xml'
      response.body = [@raw_data]
      response.finish
    else
      @app.call(env)
    end
  end

  def write(location, raw_data)
    @raw_data = raw_data
  end

  private

  def generate_sitemap
    SitemapGenerator::Sitemap.default_host = "#{!ENV["FORCE_SSL"].blank? ? "https" : "http"}://#{ENV["SERVER_NAME"]}"

    SitemapGenerator::Sitemap.create(adapter: self) do
      # Add meetings pages
      Meeting.all.each { |meeting| add meeting_path(meeting), lastmod: meeting.updated_at }
      # Add proposals pages
      Proposal.all.each { |proposal| add proposal_path(proposal), lastmod: proposal.updated_at }
      # Add static pages
      add categories_path
      add page_path('more_information')
    end
  end
end
