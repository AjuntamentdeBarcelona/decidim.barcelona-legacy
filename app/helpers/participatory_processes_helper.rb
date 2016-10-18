module ParticipatoryProcessesHelper
  def participatory_process_select(form)
    collection = ParticipatoryProcess.all.map do |p|
      [p.title[I18n.locale.to_s], p.id]
    end

    form.select :participatory_process_id, collection
  end
end
