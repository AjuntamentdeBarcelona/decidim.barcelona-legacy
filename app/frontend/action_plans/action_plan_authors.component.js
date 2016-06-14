function authors(actionPlan){
  console.log(actionPlan);
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

export default ({ actionPlan }) => (
  <div>
    <h3>{ I18n.t("components.action_plan_authors.title")}</h3>
    { authors(actionPlan).join(", ") }
  </div>
)
