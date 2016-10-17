module CommentsHelper
  def commentable_path(comment)
    participatory_process = comment.commentable.participatory_process
    name = comment.commentable.class.name.downcase.pluralize

    send("#{comment.commentable.class.to_s.downcase}_path", comment.commentable,
         participatory_process_id: participatory_process,
         step_id: Step.step_for(participatory_process, name))
  end
end
