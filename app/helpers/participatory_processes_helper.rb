module ParticipatoryProcessesHelper
  def participatory_process_select(form)
    collection = ParticipatoryProcess.all.map do |p|
      [(p.title.present? && p.title[I18n.locale.to_s].present?) ? p.title[I18n.locale.to_s] : p.name, p.id]
    end

    form.select :participatory_process_id, collection, {} , data: { 'load-scoped-fields-url': load_scoped_fields_moderation_meetings_path(format: :js), 'meeting-id': @meeting.id}
  end
end
