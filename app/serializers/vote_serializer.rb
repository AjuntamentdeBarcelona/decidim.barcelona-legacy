class VoteSerializer < ActiveModel::Serializer
  attributes :id

  has_one :voter
  has_one :votable
end
