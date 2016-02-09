class SitemapMiddleware
  def initialize(app)
    @app = app
  end

  def call(env)
    if env['PATH_INFO'] == '/sitemap.xml'
      response = Rack::Response.new
      response.header['Content-Type'] = 'text/xml'
      response.body = [generate_sitemap]
      response.finish
    else
      @app.call(env)
    end
  end

  private

  class SitemapWriter
    def initialize
      @stream = StringIO.new
    end

    def to_s
      @stream.string
    end

    def write(location, raw_xml)
      @stream.write(raw_xml)
    end
  end

  def generate_sitemap
    Rails.cache.fetch('sitemap', expires_in: 1.hour) do
      writer = SitemapWriter.new

      SitemapGenerator::Sitemap.default_host = "#{!ENV["FORCE_SSL"].blank? ? "https" : "http"}://#{ENV["SERVER_NAME"]}"

      SitemapGenerator::Sitemap.create(adapter: writer) do
        # Add meetings pages
        Meeting.find_each { |meeting| add meeting_path(meeting), lastmod: meeting.updated_at }
        # Add proposals pages
        Proposal.find_each { |proposal| add proposal_path(proposal), lastmod: proposal.updated_at }
        # Add static pages
        add categories_path
        add page_path('more_information')
      end

      writer.to_s
    end
  end
end
