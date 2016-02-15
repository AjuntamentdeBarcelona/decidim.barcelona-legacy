# coding: utf-8
class StyleValidator < ActiveModel::EachValidator
  def validate_each(record, attribute, value)
    return if value.blank?

    validate_caps(record, attribute, value)
    validate_marks(record, attribute, value)
  end

  private

  def validate_caps(record, attribute, value)
    if value.scan(/[A-Z]/).length > value.length / 2
      record.errors[attribute] << (options[:message] || I18n.t('validators.style.caps'))
    end
  end

  def validate_marks(record, attribute, value)
    if value.scan(/[!?¡¿]{2,}/).length > 0
      record.errors[attribute] << (options[:message] || I18n.t('validators.style.marks'))
    end
  end
end
