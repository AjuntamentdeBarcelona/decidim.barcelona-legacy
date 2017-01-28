require 'fileutils'

module Exporter
  def write_json(name, data)
    path = Rails.root.join("exports")
    FileUtils.mkdir_p(path)
    File.write(File.join(path, "#{name}.json"), JSON.pretty_generate(data))
  end
  module_function :write_json

  def fake_translation(translation)
    { ca: translation, es: translation }
  end
  module_function :fake_translation
end
