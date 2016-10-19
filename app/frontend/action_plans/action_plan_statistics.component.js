import { PropTypes } from 'react';

const ActionPlanStatistics = ({
  statistics
}) => (
  <div className="card extra action-plan-statistics">
    <div className="definition-data">
      {renderStatistics(statistics)}
    </div>
  </div>
);

function renderStatistics (statistics) {
  let result = [];

  for (let key in statistics) {
    result.push(
      <div key={key} className="definition-data__item definition-data__item--double">
        <span className="definition-data__title">{I18n.t(`components.action_plan_statistics.${key}`)}</span>
        <span className="definition-data__number">{statistics[key]}</span>
      </div>
    );
  }

  return result;
}

ActionPlanStatistics.propTypes = {
  statistics: PropTypes.object.isRequired
};

export default ActionPlanStatistics;
