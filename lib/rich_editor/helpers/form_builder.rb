module RichEditor
  module Helpers
    module FormBuilder
      extend ActiveSupport::Concern

      def rich_editor(method, options = {})
        @template.send("rich_editor", @object_name, method, objectify_options(options))
      end
    end
  end
end
