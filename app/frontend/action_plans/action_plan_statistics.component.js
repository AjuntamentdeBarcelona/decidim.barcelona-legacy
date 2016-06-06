export default ({
  statistics
}) => (
  <ul>
    <li>
      <span className="number">{statistics.related_proposals_count}</span>
      {I18n.t('components.action_plan_statistics.related_proposals_count')}
    </li>
    <li>
      <span className="number">{statistics.supports_count}</span>
      {I18n.t('components.action_plan_statistics.supports_count')}
    </li>
    <li>
      <span className="number">{statistics.comments_count}</span>
      {I18n.t('components.action_plan_statistics.comments_count')}
    </li>
    <li>
      <span className="number">{statistics.participants_count}</span>
      {I18n.t('components.action_plan_statistics.participants_count')}
    </li>
    <li>
      <span className="number">{statistics.meeting_interventions_count}</span>
      {I18n.t('components.action_plan_statistics.meeting_interventions_count')}
    </li>
    <li>
      <span className="number">{statistics.interventions_count}</span>
      {I18n.t('components.action_plan_statistics.interventions_count')}
    </li>
  </ul>
);
