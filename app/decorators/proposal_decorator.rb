class ProposalDecorator < ApplicationDecorator
  delegate_all

  def district_name
    district.name if district
  end

  def district_id
    district.id if district
  end

  private

  def district
    @district ||= District.find(object.district)
  end
end
