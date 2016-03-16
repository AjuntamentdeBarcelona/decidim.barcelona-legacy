module DebatesHelper
  def debate_info_box(debate)
    react_component 'DebateInfoBox',
                    starts_at: debate.starts_at,
                    ends_at: debate.ends_at
  end
end
