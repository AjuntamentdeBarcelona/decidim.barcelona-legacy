require 'geocoder'

class MeetingXLSImporter
  def initialize(file_url)
    @xlsx = Roo::Excelx.new(file_url)
  end

  def import
    ActiveRecord::Base.transaction do
      @xlsx.each_row_streaming(offset: 2) do |row|
        data = get_row_data(row)
        if data[:category_name].present?
          meeting_data = MeetingData.new(data)
          meeting_data.parse!
          create_meeting(meeting_data.to_attributes)
        end
      end
    end
  end

  private

  def get_row_data(row)
    {
      district_name: row[0].try(:value),
      tags: row[1].try(:value),
      category_name: row[5].try(:value),
      title: row[6].try(:value),
      description: row[7].try(:value),
      date_raw: row[9].try(:value),
      address: row[10].try(:value),
      address_details: row[11].try(:value),
      time_slot: row[12].try(:value)
    }
  end

  def create_meeting(attrs)
    admin = Administrator.first
    responsible_name = "Ajuntament"

    meeting = Meeting.new(attrs.merge!({ 
      author_id: admin.id,
    }))
    if meeting.save
      puts "created #{meeting.title}"
    else
      puts "errored with #{meeting.errors.full_messages.to_s}"
      debugger
    end
  end

  class MeetingData
    def initialize(data)
      @data = data
    end

    def parse!
      parse_district_name
      parse_geolocation
      parse_category_name
      parse_subcategory_name
      parse_date
      parse_time_slot
    end

    def to_attributes
      {
        scope: @data[:scope],
        district: @data[:district_id],
        title: @data[:title],
        description: @data[:description],
        address: @data[:address],
        address_details: @data[:address_details],
        address_latitude: @data[:address_latitude],
        address_longitude: @data[:address_longitude],
        held_at: @data[:held_at],
        category_id: @data[:category_id],
        subcategory_id: @data[:subcategory_id],
        start_at: @data[:start_at],
        end_at: @data[:end_at],
        tag_list: @data[:tags]
      }
    end

    private

    def parse_district_name
      if @data[:district_name].nil?
        @data[:scope] = "city"
      else
        @data[:district_name] = "Sants Montjuïc" if @data[:district_name] == "Sants-Montjïc" 
        district = Proposal::DISTRICTS.detect { |district| district[0] == @data[:district_name] }
        @data[:scope] = "district"
        puts @data
        @data[:district_id] = district[1]
      end
    end

    def parse_category_name
      match_data = @data[:category_name].match(/(?:(\d+)\.){1} ?(.*)/)
      position =  match_data[1]
      name =  match_data[2]
      category = Category.where(position: position).first
      if category.nil?
        category = Category.create(name: { ca: name, es: name, en: name }, description: { ca: "", es: "", en: "" }, position: position)
      end
      @data[:category_id] = category.id
    end

    def parse_subcategory_name
      category_id = @data[:category_id]
      subcategory_id = Category.find(category_id).subcategories.first.id
      @data[:subcategory_id] = subcategory_id
    end

    def parse_date
      @data[:held_at] = Date.parse(@data[:date_raw].to_s)
    end

    def parse_time_slot
      unless @data[:time_slot].nil?
        match_data = @data[:time_slot].split('-')
        @data[:start_at] = match_data[0]
        @data[:end_at] = match_data[0]
      end
    end

    def parse_geolocation
      WebMock.allow_net_connect!
      begin
        coords = Geocoder.search("#{@data[:address]}, Barcelona")
        @data[:address_latitude] = coords[0].latitude
        @data[:address_longitude] =  coords[0].longitude
      rescue
        sleep 1
        parse_geolocation
      end
      WebMock.disable_net_connect!
    end

  end
end
