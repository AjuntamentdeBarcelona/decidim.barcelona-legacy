module RichEditor
  module Helpers
    module FormHelper
      extend ActiveSupport::Concern

      def rich_editor(object_name, method, options = {})
        react_component "RichEditor", {
          id: "#{object_name}_#{method}", 
          name: "#{object_name}[#{method}]", 
          value: options[:object].send(method), 
          maxlength: options[:maxlength]
        }
      end
    end
  end
end
