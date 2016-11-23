module StepsHelper
  def feature_path(step)
    feature = [:proposals, :action_plans, :meetings, :debates, :dataviz, :categories].find { |f| step.feature_enabled?(f) }
    send("#{feature}_path", participatory_process_id: step.participatory_process.slug, step_id: step.id)
  end
end