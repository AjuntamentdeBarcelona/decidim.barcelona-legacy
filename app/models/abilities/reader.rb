module Abilities
  class Reader
    include CanCan::Ability

    def initialize(user)
      self.merge Abilities::Common.new(user)

      can :read, ProposalAnswer
      can :read, ActionPlan
    end
  end
end
