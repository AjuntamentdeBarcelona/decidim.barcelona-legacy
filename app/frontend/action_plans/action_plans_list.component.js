import ActionPlan from './action_plan.component';

export default ({
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
