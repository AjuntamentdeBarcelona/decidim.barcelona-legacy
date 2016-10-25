module Abilities
  class ProcessAdmin
    include CanCan::Ability

    def initialize(user)
      can :access_panel, :administration
      can :manage, ParticipatoryProcessAttachment
      can :manage, Category
      can :manage, Subcategory
      can :manage, ParticipatoryProcess
      can :read, ParticipatoryProcess
      can :manage, Step
      can :create, Debate
      can :update, Debate
      can :manage, ActionPlan
    end
  end
end
