# coding: utf-8
class Api::MeetingsController < Api::ApplicationController
  load_and_authorize_resource

  def index
    if params[:proposal_id]
      proposal = Proposal.find(params[:proposal_id])
      @meetings = proposal.meetings.includes(:tags, :proposals, :pictures)

      render json: @meetings
    else
      meetings = Meeting.all
      filter = ResourceFilter.new(params, filter_date: true)

      @meetings = filter.filter_collection(meetings.includes(:category, :subcategory))
      tag_cloud = filter.tag_cloud(@meetings)

      respond_to do |format| 
        format.json do
          render json: @meetings, meta: {
            tag_cloud: tag_cloud
          }
        end

        format.csv do
          send_data report(@meetings), disposition: 'inline', filename: 'meetings.csv'
        end
      end
    end
  end

  private

  def report(meetings)
    last_timestamp = meetings.order('updated_at desc').last.updated_at.to_i

    Rails.cache.fetch("meetings-csv-#{request.fullpath}-#{last_timestamp}") do
      CSV.generate do |csv|
        csv << [
          "ID de cita",
          "Títol",
          "Descripció",
          "Data",
          "Adreça",
          "Districte",
          "Categoria",
          "Subcategoria",
          "Assistents",
          "Propostes",
          "Intervencions",
          "URL"
        ]

        meetings.each do |meeting|
          csv << [
            meeting.id,
            meeting.title,
            meeting.description,
            l(meeting.held_at),
            meeting.address,
            District.find(meeting.district).try(:name),
            translate(meeting.category.try(:name)),
            translate(meeting.subcategory.try(:name)),
            meeting.attendee_count,
            meeting.proposals_count,
            meeting.interventions,
            url_for(meeting)
          ]
        end
      end
    end
  end

  def translate(data)
    return nil unless data
    data[I18n.locale.to_s]
  end
end
