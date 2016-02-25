module Abilities
  class Dynamizer
    include CanCan::Ability

    def initialize(user)
      self.merge Abilities::Common.new(user)
      can :access_panel, :moderation

      can :manage, Meeting
      can :create, Meeting
    end
  end
end
