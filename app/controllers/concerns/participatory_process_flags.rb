module ParticipatoryProcessFlags
  extend ActiveSupport::Concern

  class_methods do
    def ensure_participatory_process_flag(name, *options)
      before_filter(*options) do
        check_participatory_process_flag(name)
      end
    end
  end

  def check_participatory_process_flag(name)
    unless @participatory_process.send("feature_enabled?", name)
      redirect_to participatory_process_path(@participatory_process),
        notice: t('participatory_processes.flash.feature_disabled_notice')
    end
  end
end