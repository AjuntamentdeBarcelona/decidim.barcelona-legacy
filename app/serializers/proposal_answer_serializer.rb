class ProposalAnswerSerializer < ActiveModel::Serializer
  attributes :proposal_id, :message, :status, :official
end
