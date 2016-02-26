module OfficialsHelper
  def official_position(user)
    I18n.t("officials.level_#{user.official_level}")
  end
end
