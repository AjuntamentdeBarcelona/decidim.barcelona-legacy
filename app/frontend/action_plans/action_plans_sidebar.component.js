import ActionPlansFilters  from './action_plans_filters.component';

const ActionPlansSidebar = () => (
  <div className="filters-controls">
    <div className="card card--secondary show-for-mediumlarge">
      <div className="filters">
        <ActionPlansFilters />
      </div>
    </div>
  </div>
);

export default ActionPlansSidebar;
