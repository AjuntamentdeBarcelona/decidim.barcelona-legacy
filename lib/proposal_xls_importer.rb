# coding: utf-8
require 'securerandom'

class ProposalXLSImporter
  def initialize(file_url)
    @xlsx = Roo::Excelx.new(file_url)
  end

  def import
    ActiveRecord::Base.transaction do
      @xlsx.each_row_streaming(offset: 1, pad_cells: true) do |row|
        data = get_row_data(row)
        if data[:category_name].present?  
          proposal_data = ProposalData.new(data)
          proposal_data.parse!
          proposal = create_proposal(proposal_data.to_attributes)
          proposal.save!
        end
      end
    end
  end

  private

  def get_row_data(row)
    {
      district_name: row[0].try(:value),
      category_name: row[1].try(:value),
      subcategory_name: row[1].try(:value),
      title: row[2].try(:value),
      summary: row[3].try(:value),
      author_organization: row[4].try(:value),
      author_email: row[5].try(:value),
    }
  end

  def create_proposal(attrs)
    proposal = Proposal.new(attrs)
    proposal
  end

  class ProposalData
    def initialize(data)
      @data = data
    end

    def parse!
      parse_district_name
      parse_category_name
      parse_subcategory_name
      parse_author_admin
    end

    def to_attributes
      {
        scope: @data[:scope],
        district: @data[:district_id],
        title: @data[:title],
        summary: @data[:summary],
        category_id: @data[:category_id],
        subcategory_id: @data[:subcategory_id],
        author_id: @data[:author_id],
        responsible_name: @data[:responsible_name],
        official: @data[:official]
      }
    end

    private

    def parse_district_name
      if @data[:district_name] == "Barcelona" or @data[:district_name] == "Tota la Ciutat (PAM)"
        @data[:scope] = "city"
      else
        district = District.all.find { |d| d.name == @data[:district_name] }
        @data[:scope] = "district"
        @data[:district_id] = district.id
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
      match_data = @data[:subcategory_name].match(/(?:(\d+).(\d+).){1} ?(.*)/)
      category_position = match_data[1]
      position =  match_data[2]
      name =  match_data[3]
      category = Category.where(position: category_position).first
      subcategory = Subcategory.where(position: position, category_id: category.id).first
      if subcategory.nil?
        subcategory = Subcategory.create(name: { ca: name, es: name, en: name }, description: { ca: "", es: "", en: "" }, position: position, category_id: category.id)
      end
      @data[:subcategory_id] = subcategory.id
    end

    def parse_author_admin
      user = Administrator.first
      @data[:responsible_name] = "Ajuntament"
      @data[:author_id] = user.id
      @data[:official] = true
    end

  end
end
