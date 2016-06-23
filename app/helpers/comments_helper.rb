module CommentsHelper
  def commentable_path(comment)
    send("#{comment.commentable.class.to_s.downcase}_path", comment.commentable, participatory_process_id: comment.commentable.participatory_process)
  end
end
