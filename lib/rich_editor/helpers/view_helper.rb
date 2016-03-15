module RichEditor
  module Helpers
    module ViewHelper
      extend ActiveSupport::Concern

      def rich_editor_tag(name, content = nil, options = {})
        react_component "RichEditor", {
          id: options[:id],
          name: name, 
          value: content, 
          maxlength: options[:maxlength]
        }
      end
    end
  end
end
