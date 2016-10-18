module MailerHelper
  def commentable_url(commentable)
    name = commentable.class.name.downcase.pluralize
    participatory_process = commentable.participatory_process

    url_for(id: commentable, controller: name, action: :show,
            participatory_process_id: participatory_process,
            step_id: Step.step_for(participatory_process, name))
  end
end
