module Abilities
  class Reviewer
    include CanCan::Ability

    def initialize(user)
      self.merge Abilities::Everyone.new(user)

      can :access_panel, :revision

      can :moderate, Proposal

      can [:read, :create, :update], [ProposalAnswer]
    end
  end
end
