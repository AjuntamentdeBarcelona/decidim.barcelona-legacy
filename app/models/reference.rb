class Reference < ActiveRecord::Base
  belongs_to :comment
  belongs_to :referenced, polymorphic: true

  def self.references_for(subject)
    references = where(referenced: subject).map{ |reference| reference.comment.commentable }
    references += where(comment: subject.comments).map(&:referenced)
    references.uniq
  end
end
