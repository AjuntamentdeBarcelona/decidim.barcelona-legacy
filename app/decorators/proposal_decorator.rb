class ProposalDecorator < ApplicationDecorator
  delegate_all

  def district_name
    district.try(:name)
  end

  def district_id
    district.try(:id)
  end

  private

  def district
    @district ||= object.scope == 'district' ? District.find(object.district) : nil
  end
end
