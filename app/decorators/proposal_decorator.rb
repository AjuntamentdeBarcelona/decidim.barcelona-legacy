class ProposalDecorator < ApplicationDecorator
  delegate_all

  def district_name
    district = Proposal::DISTRICTS.detect { |district| object.district == district[1].to_i }
    if district
      district[0]
    end
  end
end
