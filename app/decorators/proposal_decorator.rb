class ProposalDecorator < ApplicationDecorator
  delegate_all

  def district_name
    district.try(:name)
  end

  def district_id
    district.try(:id)
  end

  def origin
    return 'official' if object.official?
    return 'meeting' if object.from_meeting?
    return 'organization' if object.author.organization?
    return 'citizenship'
  end

  private

  def district
    @district ||= object.scope == 'district' ? District.find(object.district) : nil
  end
end
