module ParticipatoryProcessesHelper
  def participatory_process_select(form)
    collection = ParticipatoryProcess.all.map do |p|
      [(p.title.present? && p.title[I18n.locale.to_s].present?) ? p.title[I18n.locale.to_s] : p.name, p.id]
    end

    form.select :participatory_process_id, collection
  end

  def participatory_process_timeline_class_names(step)
    class_names = ""
    class_names += "timeline__item--current" if step.current?
    class_names += "timeline__item--inactive" unless step.enabled?
    class_names
  end
end
