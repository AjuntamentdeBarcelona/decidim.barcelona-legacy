module Abilities
  class Administrator
    include CanCan::Ability

    def initialize(user)
      self.merge Abilities::Moderation.new(user)

      can :access_panel, :administration

      can :restore, Comment
      cannot :restore, Comment, hidden_at: nil

      can :restore, Debate
      cannot :restore, Debate, hidden_at: nil

      can :create, Debate
      can :update, Debate
      can :manage, ActsAsTaggableOn::Tag
      can :manage, :verifications
      can :show, Activity
      can :manage, ParticipatoryProcess

      can :show, :statistics

      can :restore, Proposal
      cannot :restore, Proposal, hidden_at: nil

      can :manage, User
      can :restore, User
      cannot :restore, User, hidden_at: nil

      can :confirm_hide, Comment
      cannot :confirm_hide, Comment, hidden_at: nil

      can :write_long, Comment

      can :confirm_hide, Debate
      cannot :confirm_hide, Debate, hidden_at: nil

      can :confirm_hide, Proposal
      cannot :confirm_hide, Proposal, hidden_at: nil

      can :confirm_hide, User
      cannot :confirm_hide, User, hidden_at: nil

      can :comment_as_administrator, [Debate, Comment, Proposal]

      can :manage, :moderator

      can :manage, Annotation

      can :manage, Meeting
      can :manage, ParticipatoryProcessAttachment

      can :manage, SpendingProposal

      can :manage, Category
      can :manage, Subcategory
      can :manage, ParticipatoryProcess
      can :manage, Step

      can :mark_as_official, Proposal

      can :see_recommendations, Proposal

      can :download_report, Proposal
    end
  end
end
