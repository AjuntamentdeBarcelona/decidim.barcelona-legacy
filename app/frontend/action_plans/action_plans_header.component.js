const ActionPlansHeader = ()  => (
  <div className="page-title">
    <div className="wrap row proposals-header">
      <div className="small-12 columns">
        <h2>{ I18n.t('action_plans.index.title') }</h2>
      </div>
    </div>
    <div className="wrap row proposals-header">
      <div className="small-12 medium-12 large-12 columns">
        <h3>{ I18n.t('action_plans.index.description') }</h3>
      </div>
    </div>
  </div>
);

export default ActionPlansHeader;

