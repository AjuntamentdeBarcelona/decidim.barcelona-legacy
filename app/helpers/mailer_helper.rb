module MailerHelper

  def commentable_url(commentable)
    if commentable.is_a?(Debate)
      debate_url(commentable, participatory_process_id: commentable.participatory_process.slug) 
    elsif commentable.is_a?(Proposal)
      proposal_url(commentable, participatory_process_id: commentable.participatory_process.slug) 
    end
  end

end