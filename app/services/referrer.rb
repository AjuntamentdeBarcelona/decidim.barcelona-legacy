class Referrer
  TYPES = {
    proposals: Proposal,
    debates: Debate
  }

  def initialize(comment)
    @comment = comment
  end

  def references
    TYPES.flat_map do |type, model|
      matches = @comment.body.scan(/https?:\/\/\S+\/#{type}\/([A-z\-]+)\/?/)
      next unless matches.any?

      matches.map do |match|
        model.find_by_slug(match)
      end
    end.compact
  end

  def reference!
    references.each do |referenced|
      Reference.create(
        referenced: referenced,
        comment: @comment
      )
    end
  end
end
