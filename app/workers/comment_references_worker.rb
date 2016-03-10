class CommentReferencesWorker
  include Sidekiq::Worker

  def perform(comment_id)
    comment = Comment.find(comment_id)
    Referrer.new(comment, comment.commentable).reference!(comment.body)
  end
end
