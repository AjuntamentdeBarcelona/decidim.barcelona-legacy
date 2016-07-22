import { PropTypes } from 'react';
import unique        from 'array-unique';

function authors(actionPlan){
  let { actionPlansProposals } = actionPlan;

  if (actionPlansProposals) {
    let authors = actionPlansProposals.map(
      (actionPlanProposal) => actionPlanProposal.proposal.author.name
    ).filter(name => name).map(name => name.trim());

    return unique(authors);
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
