import { PropTypes } from 'react';

const ActionPlanStatistics = ({
  statistics
}) => (
  <ul className="action-plan-statistics">
    {renderStatistics(statistics)}
  </ul>
);

function renderStatistics (statistics) {
  let result = [];

  for (let key in statistics) {
    result.push(
      <li key={key}>
        <span className="number">{statistics[key]}</span>
        {I18n.t(`components.action_plan_statistics.${key}`)}
      </li>
    );
  }

  return result;
}

ActionPlanStatistics.propTypes = {
  statistics: PropTypes.object.isRequired
};

export default ActionPlanStatistics;
