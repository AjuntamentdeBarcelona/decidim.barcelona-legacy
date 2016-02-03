# This class creates a summary of a user's related activites and relevant
# information. It can be used to show a dashboard or send a newsletter.
#
class ActivitySummary
  # Public: Initializes an Activity summary with a User subject and a timestamp
  # from where to scope the activity to.
  #
  # user - The User to generate the activity sumary to.
  # since - A DateTime from when to generate the activity to.
  # to - A DateTime to when to generate the activity to.
  def initialize(user, since = 1.week.ago, to = Time.now)
    @user = user
    @since = since
    @to = to
  end

  # Public: Returns the most active proposals during a time period, based on
  # their hot score.
  #
  # limit - A limit of results to return.
  #
  # Returns an ActiveRecord::Relation
  def most_active(limit = 5)
    Proposal.
      order('hot_score desc').
      where('updated_at > ?', @since).
      where('updated_at <= ?', @to).
      limit(limit)
  end

  # Public: Returns the most active proposals created by you on a time period.
  #
  # limit - A limit of results to return.
  #
  # Returns an ActiveRecord::Relation
  def own_active(limit = 5)
    most_active.where(author_id: @user)
  end

  # Public: Returns the recent comments on the proposals in which you're the author.
  #
  # limit - A limit of results to return.
  #
  # Returns an ActiveRecord::Relation
  def recent_comments(limit = 5)
    Comment.
      where(commentable: Proposal.where(author: @user)).
      where('updated_at > ?', @since).
      where('updated_at <= ?', @to).
      order('updated_at desc').
      limit(limit)
  end

  # Public: Returns the most active proposals you've voted.
  #
  # limit - A limit of results to return.
  #
  # Returns an ActiveRecord::Relation
  def most_active_voted(limit = 5)
    most_active.where(id: @user.get_voted(Proposal))
  end

  # Public: Returns the amount of votes a Proposal received during a time period.
  def votes_count(proposal)
    proposal.votes_for.
      where('created_at > ?', @since).
      where('created_at <= ?', @to).
      count
  end

  # Public: Returns the amount of votes a Proposal received during a time period.
  def comments_count(proposal)
    proposal.comments.
      where('created_at > ?', @since).
      where('created_at <= ?', @to).
      count
  end
end
