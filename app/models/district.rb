class District
  include ActiveModel::Model

  def self.all
    @all ||= YAML::load_file("#{Rails.root}/config/districts.yml")["districts"].map do |id, attrs|
      new({id: id.to_i}.merge(attrs))
    end
  end

  def self.find(id)
    all.find{ |district| id.to_i == district.id.to_i }
  end

  attr_accessor :id, :name
end
