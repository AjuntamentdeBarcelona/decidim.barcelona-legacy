class VoteSerializer < ActiveModel::Serializer
  attributes :id

  belongs_to :voter
  belongs_to :votable
end
