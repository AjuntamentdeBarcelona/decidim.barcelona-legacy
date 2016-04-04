class ProposalAnswerSerializer < ActiveModel::Serializer
  attributes :proposal_id, :message, :status
end
