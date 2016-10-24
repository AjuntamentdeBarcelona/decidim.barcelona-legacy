module FoundationRailsHelper
  class FormBuilder < ActionView::Helpers::FormBuilder
    def cktext_area(attribute, options)
      field(attribute, options) do |opts|
        super(attribute, opts)
      end
    end
  end

  module FlashHelper
    def alert_box(value, alert_class, closable)
      options = { class: "flash callout #{alert_class}" }
      options[:data] = { closable: '' } if closable
      content_tag(:div, options) do
        concat value.html_safe
        concat close_link if closable
      end
    end
  end
end
