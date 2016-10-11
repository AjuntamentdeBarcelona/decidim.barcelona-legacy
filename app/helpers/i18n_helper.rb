module I18nHelper
  def translate(field, locale = I18n.default_locale)
    field.try(:[], locale.to_s)
  end
end
