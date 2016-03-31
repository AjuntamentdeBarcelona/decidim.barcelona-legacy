module VotesHelper

  def debate_percentage_of_likes(debate)
    debate.likes.percent_of(debate.total_votes)
  end

  def votes_percentage(vote, debate)
    return "0%" if debate.total_votes == 0
    if vote == 'likes'
      debate_percentage_of_likes(debate).to_s + "%"
    elsif vote == 'dislikes'
      (100 - debate_percentage_of_likes(debate)).to_s + "%"
    end
  end

  def css_classes_for_vote(votes, votable)
    case votes[votable.id]
    when true
      {in_favor: "voted", against: "no-voted"}
    when false
      {in_favor: "no-voted", against: "voted"}
    else
      {in_favor: "", against: ""}
    end
  end

  def voted_for?(votes, votable)
    votes[votable.id]
  end

  def vote_component_for(resource)
    cant_vote_text = 
      if user_signed_in?
        if current_user.organization?
          t("votes.organizations")
        elsif !resource.votable_by?(current_user)
          t("votes.verified_only", 
            verify_account: link_to(t("votes.verify_account"), verification_path ))
        end
      else
        t("votes.unauthenticated",
          signin: link_to(t("votes.signin"), new_user_session_path),
          signup: link_to(t("votes.signup"), new_user_registration_path))
      end

    react_component "Votes", 
      vote_url: api_proposal_votes_url(proposal_id: resource),
      total_votes: resource.total_votes,
      already_voted: current_user && current_user.voted_up_on?(resource),
      cant_vote: !user_signed_in? || 
        (user_signed_in? && !resource.votable_by?(current_user)) ||
        (user_signed_in? && current_user.organization?),
      cant_vote_text: cant_vote_text,
      comments_count: resource.comments_count,
      comments_url: namespaced_proposal_path(resource, anchor: "comments"),
      share_buttons_html: share_button_for(resource),
      proposal: {
        title: resource.title,
        url: proposal_url(resource)
      }
  end
end
