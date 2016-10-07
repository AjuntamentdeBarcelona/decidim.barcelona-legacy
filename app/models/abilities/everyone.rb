module Abilities
  class Everyone
    include CanCan::Ability

    def initialize(user)
      can :read, Debate
      can :read, Proposal
      can :read, Meeting
      can :read, Comment
      can :read, SpendingProposal
      can :read, ProposalAnswer
      can :read, ActionPlan
      can :read, User
      can :read, Category
      can :read, Subcategory
      can :read, District
    end
  end
end
