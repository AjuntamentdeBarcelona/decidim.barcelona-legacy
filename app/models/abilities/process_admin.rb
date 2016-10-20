module Abilities
  class ProcessAdmin
    include CanCan::Ability

    def initialize(user)
      self.merge Abilities::Common.new(user)

      can :access_panel, :moderation
      can :access_panel, :administration
      can :manage, ParticipatoryProcessAttachment
      can :manage, Category
      can :manage, Subcategory
      can :manage, ParticipatoryProcess
      can :read, ParticipatoryProcess
      can :manage, Step

      can :manage, Meeting
      can :create, Meeting
    end
  end
end
