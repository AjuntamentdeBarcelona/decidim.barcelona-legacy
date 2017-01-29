require "exporter"

namespace :exporter do
  task :comments => :environment do
    data = Comment.unscoped.find_each.map do |comment|
      serialize_comment(comment)
    end

    Exporter.write_json("comments", data)
  end

  def serialize_comment(comment)
    {
      decidim_commentable_id: comment.commentable_id,
      decidim_commentable_type: translate_commentable_type(comment.commentable_type),
      decidim_author_id: comment.user_id,
      body: comment.body,
      created_at: comment.created_at,
      updated_at: comment.updated_at,
      alignment: comment.alignment,
      depth: comment.depth,
      replies: comment.children.map{ |c| serialize_comment(c) },
      votes_up: votes_for(comment).up.pluck(:voter_id),
      votes_down: votes_for(comment).down.pluck(:voter_id)
    }
  end

  def votes_for(comment)
    Vote.where(votable: comment)
  end

  def translate_commentable_type(type)
    {
      "Proposal" => "Decidim::Proposals::Proposal",
      "Debate" => "Decidim::Debates::Debate",
      "ActionPlan" => "Decidim::Results::Result"
    }[type]
  end
end
