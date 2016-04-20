module Abilities
  class Reviewer
    include CanCan::Ability

    def initialize(user)
      self.merge Abilities::Common.new(user)

      can :access_panel, :revision

      can :moderate, Proposal
      can :review, Proposal
      can :comment, Proposal
      can :read, ActionPlan
      can :approve, ActionPlan

      can [:read, :create, :update], [ProposalAnswer]
      can :manage, ActionPlan
      can :manage, ActionPlanRevision
    end
  end
end
