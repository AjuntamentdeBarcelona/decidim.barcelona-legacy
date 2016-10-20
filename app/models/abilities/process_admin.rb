module Abilities
  class ProcessAdmin
    include CanCan::Ability

    def initialize(user)
      can :access_panel, :administration
      can :manage, ParticipatoryProcessAttachment
      can :manage, Category
      can :manage, Subcategory
      can :manage, ParticipatoryProcess
      can :manage, Step
    end
  end
end
