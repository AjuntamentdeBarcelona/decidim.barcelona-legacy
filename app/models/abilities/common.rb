module Abilities
  class Common
    include CanCan::Ability

    def initialize(user)
      self.merge Abilities::Everyone.new(user)

      can [:read, :update], User, id: user.id

      can :read, Debate
      can :update, Debate do |debate|
        debate.editable_by?(user)
      end

      can :read, Proposal
      can :update, Proposal do |proposal|
        proposal.editable_by?(user)
      end

      can :read, SpendingProposal

      can :create, Comment
      can :create, Debate if user.official_level? &&
                             user.official_level > 0

      can :create, Proposal

      can :write_long, Comment if user.official?

      can [:flag, :unflag], Comment
      cannot [:flag, :unflag], Comment, user_id: user.id

      can [:flag, :unflag], Debate
      cannot [:flag, :unflag], Debate, author_id: user.id

      can [:flag, :unflag], Proposal
      cannot [:flag, :unflag], Proposal, author_id: user.id

      can :comment, Proposal

      can :comment, Debate
      can :comment, ActionPlan

      can :manage, Follow, follower_id: user.id

      unless user.organization?
        can :vote, Debate
        can :vote, Comment
      end

      if user.level_two_or_three_verified?
        can :vote, Proposal
        can :unvote, Proposal
        can :vote_featured, Proposal
        can :create, SpendingProposal
      end
    end
  end
end
