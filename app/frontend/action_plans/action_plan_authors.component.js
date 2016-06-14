import { PropTypes } from 'react';

function authors(actionPlan){
  let { actionPlansProposals } = actionPlan;

  if (actionPlansProposals) {
    return actionPlansProposals.map(
      (actionPlanProposal) =>
        actionPlanProposal.proposal.author.name
    );
  } else {
    return [];
  }
}

const ActionPlanAuthors = ({ actionPlan }) => (
  <div>
    <h3>{ I18n.t("components.action_plan_authors.title")}</h3>
    { authors(actionPlan).join(", ") }
  </div>
)

ActionPlanAuthors.propTypes = {
  actionPlan: PropTypes.object.isRequired
};

export default ActionPlanAuthors;
