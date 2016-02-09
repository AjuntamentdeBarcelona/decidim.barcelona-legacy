class ProposalDecorator < ApplicationDecorator
  delegate_all

  def district_name
    district[0] if district
  end

  def district_id
    district[1] if district
  end

  private

  def district
    @district ||= Proposal::DISTRICTS.detect { |district| object.district == district[1].to_i }
  end
end
