module MeetingsDirectoryHelper
  def meetings_directory(options = {})
    react_component(
      'MeetingsDirectory',
      filter: options[:filter],
      filterUrl: meetings_url,
      meetings: serialized_meetings(options[:meetings]),
      districts: Proposal::DISTRICTS,
      categories: serialized_categories,
      subcategories: serialized_subcategories,
      tagCloud: options[:tag_cloud],
      tagsEnabled: feature?(:meeting_tags)
    )
  end

  def meetings_map(meetings)
    react_component(
      'MeetingsMap', 
      meetings: serialized_meetings(meetings)
    )
  end

  def serialized_meetings(meetings)
    ActiveModel::ArraySerializer.new(meetings, each_serializer: MeetingSerializer).as_json
  end
end
