import { PropTypes } from 'react';

import ActionPlan    from './action_plan.component';

const ActionPlansList = ({
  actionPlans
}) => (
  <div id="action-plans" className="proposals-list">
    {
      actionPlans.map((actionPlan) => {
        return (
          <ActionPlan key={actionPlan.id} {...actionPlan} />
        )
      })
    }
  </div>
);

ActionPlansList.propTypes = {
  actionPlans: PropTypes.array
};

export default ActionPlansList;
