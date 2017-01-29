require "exporter"

namespace :exporter do
  task :meetings => :environment do
    data = Meeting.unscoped.find_each.map do |meeting|
      {
        id: meeting.id,
        title: meeting.title,
        short_description: meeting.description,
        held_at: meeting.held_at,
        start_time: combine_datetime(meeting.held_at, meeting.start_at),
        end_time: combine_datetime(meeting.held_at, meeting.end_at),
        location: meeting.address,
        location_hints: meeting.address_details,
        latitude: meeting.address_latitude,
        longitude: meeting.address_longitude,
        closed_at: meeting.closed_at,
        closing_report: meeting.close_report,
        category_id: meeting.category_id,
        subcategory_id: meeting.subcategory_id,
        scope: meeting.scope == "district" ? district_name(meeting.district) : nil,
        attendees_count: meeting.attendee_count,
        contributions_count: meeting.interventions,
        attending_organizations: meeting.organizations,
        process_id: meeting.participatory_process.id,

        created_at: meeting.created_at,
        created_at: meeting.updated_at,

        extra: {
          slug: meeting.slug,
        }
      }
    end

    Exporter.write_json("meetings", data)
  end

  def district_name(id)
    District.find(id).try(:name)
  end

  def combine_datetime(date, time)
    return nil unless date && time

    DateTime.new(date.year, date.month, date.day,
                 time.hour, time.min, time.sec, time.zone)
  end
end
