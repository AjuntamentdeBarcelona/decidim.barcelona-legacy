module ApplicationHelper

  def home_page?
    # Using path because fullpath yields false negatives since it contains
    # parameters too
    request.path == '/'
  end

  def more_information?
    request.path == page_path("more_information")
  end

  def opendata_page?
    request.path == '/opendata'
  end

  # if current path is /debates current_path_with_query_params(foo: 'bar') returns /debates?foo=bar
  # notice: if query_params have a param which also exist in current path, it "overrides" (query_params is merged last)
  def current_path_with_query_params(query_parameters)
    url_for(request.query_parameters.merge(query_parameters))
  rescue
    request.path
  end

  def markdown(text)
    # See https://github.com/vmg/redcarpet for options
    render_options = {
      filter_html:     false,
      hard_wrap:       true,
      link_attributes: {  target: "_blank" }
    }
    renderer = Redcarpet::Render::HTML.new(render_options)
    extensions = {
      autolink:           true,
      fenced_code_blocks: true,
      lax_spacing:        true,
      no_intra_emphasis:  true,
      strikethrough:      true,
      superscript:        true
    }
    Redcarpet::Markdown.new(renderer, extensions).render(text).html_safe
  end

  def javascript_include_google_maps_api_tag
    javascript_include_tag "https://maps.googleapis.com/maps/api/js?key=#{Rails.application.secrets.google_maps_api_key}&libraries=places&callback=gmapsLoaded", async: 'async', defer: 'async'
  end

  def sanitize_content(content)
    sanitize(content, tags: %w(strong b em ul li p ol))
  end

  def cookies_accepted?
    return true if Rails.env.test?

    cookies['decidim-barcelona-cc'].present?
  end

  def cookies_warning
    unless cookies_accepted?
      react_component 'CookiesWarning', allowCookiesUrl: allow_cookies_url
    end
  end

  def show_new_terms_and_conditions?
    request.path != users_registrations_delete_form_path &&
      request.path != page_path(id: "conditions") &&
      current_user &&
      !current_user.hide_new_terms
  end
end
