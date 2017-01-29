require "exporter"

namespace :exporter do
  task :meetings => :environment do
    data = Meeting.unscoped.find_each.map do |meeting|

      {
        id: meeting.id,
        title: meeting.title,
        short_description: meeting.description,
        start_time: combine_datetime(meeting.held_at, meeting.start_at),
        end_time: combine_datetime(meeting.held_at, meeting.end_at),
        address: meeting.address,
        location: meeting.address_details,
        latitude: meeting.address_latitude,
        longitude: meeting.address_longitude,
        closed_at: meeting.closed_at,
        closing_report: meeting.close_report,
        category_id: meeting.category_id,
        subcategory_id: meeting.subcategory_id,
        scope_id: meeting.district,
        attendees_count: meeting.attendee_count,
        contributions_count: meeting.interventions,
        attending_organizations: meeting.organizations,
        process_id: meeting.participatory_process.id,

        related_proposal_ids: meeting.proposals.pluck(:id),

        created_at: meeting.created_at,
        updated_at: meeting.updated_at,

        extra: {
          slug: meeting.slug,
        }
      }
    end

    Exporter.write_json("meetings", data)
  end

  def combine_datetime(date, time)
    return nil unless date

    if time
      DateTime.new(date.year, date.month, date.day,
                  time.hour, time.min, time.sec, time.zone)
    else
      DateTime.new(date.year, date.month, date.day,
                   12, 0, 0)
    end
  end
end
