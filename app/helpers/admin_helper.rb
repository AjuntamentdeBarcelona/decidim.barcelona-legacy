module AdminHelper

  def side_menu
    render "/#{top_level_namespace}/menu"
  end

  def official_level_options
    options = [[t("officials.level_0"), 0]]
    (1..5).each do |i|
      options << [t("officials.level_#{i}"), i]
    end
    options
  end

  private

    def top_level_namespace
      namespace.split(':').first
    end

    def namespace
      controller.class.parent.name.downcase
    end

end
