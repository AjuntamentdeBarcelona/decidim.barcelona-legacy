module Abilities
  class Everyone
    include CanCan::Ability

    def initialize(user)
      can :read, Debate
      can :read, Proposal
      can :read, Meeting
      can :read, Comment
      can :read, SpendingProposal
      can :read, Legislation
      can :read, ProposalAnswer
      can :read, ActionPlan
      can :read, User
      can [:search, :read], Annotation
      can :read, Category
      can :read, Subcategory
      can :read, District

      can :read, ParticipatoryProcess do |participatory_process|
        participatory_process.published?
      end
    end
  end
end
