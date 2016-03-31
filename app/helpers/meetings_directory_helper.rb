module MeetingsDirectoryHelper
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
