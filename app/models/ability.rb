class Ability
  include CanCan::Ability

  def initialize(user)
    # If someone can hide something, he can also hide it
    # from the moderation screen
    alias_action :hide_in_moderation_screen, to: :hide

    self.merge Abilities::Everyone.new(user)

    if user
      self.merge Abilities::Common.new(user)

      user.roles.each do |role|
        self.merge Abilities.const_get(role.classify).new(user) rescue NameError
      end
    end
  end
end
