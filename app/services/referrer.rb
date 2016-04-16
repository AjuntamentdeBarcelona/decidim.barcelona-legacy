class Referrer
  TYPES = {
    proposals: Proposal,
    debates: Debate
  }

  def initialize(source, referrer)
    @source = source
    @referrer = referrer
  end

  def references(content)
    TYPES.flat_map do |type, model|
      matches = content.scan(/https?:\/\/\S+\/#{type}\/([^\s\/\.]+)\/?/)
      next unless matches.any?

      matches.map do |match|
        model.find_by_slug(match)
      end
    end.compact
  end

  def reference!(content)
    references(content).each do |referenced|
      Reference.create(
        source: @source,
        referrer: @referrer,
        referenced: referenced
      )
    end
  end

  def dereference!
    Reference.where(source: @source).destroy_all
  end
end
