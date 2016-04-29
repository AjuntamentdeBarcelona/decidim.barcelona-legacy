class ActionPlansProposalSerializer < ActiveModel::Serializer
  attributes :level
  has_one :proposal
end
