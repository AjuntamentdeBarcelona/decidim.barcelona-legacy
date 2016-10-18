import { PropTypes } from 'react';

import ActionPlan    from './action_plan.component';

const ActionPlansList = ({
  actionPlans
}) => (
  <div className="row small-up-1 medium-up-2 mediumlarge-up-1 large-up-2 card-grid">
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
