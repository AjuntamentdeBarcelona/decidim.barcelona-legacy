module ParticipatoryProcessesHelper
  def participatory_process_select(form)
    collection = ParticipatoryProcess.all.map do |p|
      [(p.title.present? && p.title[I18n.locale.to_s].present?) ? p.title[I18n.locale.to_s] : p.name, p.id]
    end

    form.select :participatory_process_id, collection
  end
end
