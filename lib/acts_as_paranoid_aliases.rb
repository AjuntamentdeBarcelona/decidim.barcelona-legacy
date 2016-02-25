module ActsAsParanoidAliases

  def self.included(base)
    base.extend(ClassMethods)

    def hide
      return false if hidden?
      update_attribute(:hidden_at, Time.now)
      after_hide
    end

    def hidden?
      deleted?
    end

    def after_hide
    end

    def confirmed_hide?
      confirmed_hide_at.present?
    end

    def confirm_hide
      hide unless hidden?
      update_attribute(:confirmed_hide_at, Time.now)
    end

    def restore(opts={})
      super(opts)
      update_attribute(:confirmed_hide_at, nil)
      after_restore
    end

    def after_restore
    end
  end

  module ClassMethods
    def with_confirmed_hide
      only_hidden.where.not(confirmed_hide_at: nil)
    end

    def without_confirmed_hide
      only_hidden.where(confirmed_hide_at: nil)
    end

    def with_hidden
      with_deleted
    end

    def only_hidden
      only_deleted
    end

    def hide_all(ids)
      return if ids.blank?
      where(id: ids).each(&:hide)
    end

    def restore_all(ids)
      return if ids.blank?
      only_hidden.where(id: ids).each(&:restore)
    end
  end
end
