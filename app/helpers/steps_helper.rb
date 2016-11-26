module StepsHelper
  def feature_path(step)
    feature = [:proposals, :action_plans, :meetings, :debates, :dataviz, :categories].find { |f| step.feature_enabled?(f) }
    return step_path(participatory_process_id: step.participatory_process.slug, step_id: step) unless feature
    send("#{feature}_path", participatory_process_id: step.participatory_process.slug, step_id: step.id)
  end

  def active_step_for_feature(object, feature_name)
    object.participatory_process
      .steps.where(active: true).order('position desc')
      .to_a.find{ |s| s.flags.include? feature_name }
  end
end