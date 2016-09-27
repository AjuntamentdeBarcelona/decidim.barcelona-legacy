module ReferencesHelper
  def reference_path(reference)
    send("#{reference.class.name.downcase}_path", id: reference, participatory_process: reference.participatory_process)
  end
end
