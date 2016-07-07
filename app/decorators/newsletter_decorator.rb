class NewsletterDecorator < ApplicationDecorator
  delegate_all

  def title
    @title ||= localized(:title)
  end

  def body
    @body ||= localized(:body)
  end

  private

  def localized(field)
    data = object.send(field)
    data[I18n.locale.to_s] || data[I18n.default_locale.to_s]
  end
end
