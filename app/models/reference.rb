class Reference < ActiveRecord::Base
  belongs_to :source, polymorphic: true
  belongs_to :referenced, polymorphic: true
  belongs_to :referrer, polymorphic: true

  def self.references_for(subject)
    ids = where(referrer: subject).pluck(:id)
    ids += where(referenced: subject).pluck(:id)

    where(id: ids).
      flat_map{ |r| [r.referenced, r.referrer] }.uniq - [subject]
  end
end
