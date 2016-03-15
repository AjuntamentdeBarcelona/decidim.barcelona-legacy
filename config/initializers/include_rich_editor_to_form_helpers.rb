ActionView::Base.send :include, RichEditor::Helpers::ViewHelper
ActionView::Base.send :include, RichEditor::Helpers::FormHelper
ActionView::Helpers::FormBuilder.send :include, RichEditor::Helpers::FormBuilder
