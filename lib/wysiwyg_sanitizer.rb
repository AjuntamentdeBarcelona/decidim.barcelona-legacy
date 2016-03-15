class WYSIWYGSanitizer

  ALLOWED_TAGS = %w(div br p ul ol li strong em u s)
  ALLOWED_ATTRIBUTES = []

  def sanitize(html)
    ActionController::Base.helpers.sanitize(html, tags: ALLOWED_TAGS, attributes: ALLOWED_ATTRIBUTES)
  end

end