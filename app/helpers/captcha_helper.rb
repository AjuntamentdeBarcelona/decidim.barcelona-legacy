module CaptchaHelper
  def captcha(model)
    return if Recaptcha::Verify.skip?(nil)

    content_tag :div, class: 'captcha' do
      recaptcha_tags(hl: I18n.locale)
    end
  end
end
