import { PropTypes } from 'react';
import unique        from 'array-unique';

const defaultAuthors = ["Ajuntament de Barcelona"];

function proposalAuthorName(proposal){
  if (proposal.author) {
    return proposal.author.name;
  }
}

function authors(actionPlan){
  let { actionPlansProposals } = actionPlan;

  if (actionPlansProposals) {
    let authors = actionPlansProposals.map(
      (actionPlanProposal) => proposalAuthorName(actionPlanProposal.proposal)
    ).filter(name => name).map(name => name.trim());

    if(authors.length > 0) {
      return unique(authors);
    } else {
      return defaultAuthors;
    }
  } else {
    return defaultAuthors;
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
