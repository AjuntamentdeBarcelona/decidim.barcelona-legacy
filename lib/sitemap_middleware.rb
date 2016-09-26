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
        default_participatory_process = ParticipatoryProcess.first

        # Add meetings pages
        Meeting.includes(:participatory_process).find_each { |meeting| add meeting_path(id: meeting, participatory_process_id: meeting.participatory_process), lastmod: meeting.updated_at }
        # Add proposals pages
        Proposal.includes(:participatory_process).find_each { |proposal| add proposal_path(id: proposal, participatory_process_id: proposal.participatory_process), lastmod: proposal.updated_at }
        # Add static pages
        add categories_path(participatory_process_id: default_participatory_process)
        add page_path(id: 'more_information', participatory_process_id: default_participatory_process)
      end

      writer.to_s
    end
  end
end
