class ProposalSerializer < ActiveModel::Serializer
  attributes :id, :title, :url, :author_name, :votes, :official

  link(:url) { proposal_path(object) }

  def author_name
    unless object.official? || object.from_meeting?
      object.author.name
    end
  end

  def votes
    object.total_votes
  end
end
