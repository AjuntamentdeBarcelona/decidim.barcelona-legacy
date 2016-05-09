class ActionPlanReport < ActiveRecord::Base
  def self.generated
    where(pending: false)
  end

  def self.pending
    where(pending: true)
  end

  def self.sort_by_created_at_desc
    order(arel_table[:created_at].desc)
  end

  def generated?
    !pending?
  end

  def generate
    raise "Already generated" unless pending?
    update(pending: false)
  end
end
