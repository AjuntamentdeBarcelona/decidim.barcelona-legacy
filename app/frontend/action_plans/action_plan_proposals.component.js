import { Component }              from 'react';
import { bindActionCreators }     from 'redux';
import { connect }                from 'react-redux';

import ProposalsAutocompleteInput from '../proposals/proposals_autocomplete_input.component';
import ProposalsTable             from '../proposals/proposals_table.component';

import { 
  addActionPlanProposal,
  removeActionPlanProposal,
  fetchActionPlanProposals 
} from './action_plans.actions';


class ActionPlanProposals extends Component {
  componentDidMount() {
    const { actionPlan } = this.props;

    this.props.fetchActionPlanProposals(actionPlan.id);
  }

  render() {
    const { actionPlan, addActionPlanProposal, removeActionPlanProposal } = this.props;
    const { id } = actionPlan;
    const proposals = actionPlan.proposals || [];

    return (
      <div>
        <h4>{I18n.t("components.action_plan_proposals.title")}</h4>
        <ProposalsAutocompleteInput 
          proposalsApiUrl="/api/proposals"
          excludeIds={proposals.map(proposal => proposal.id)}
          onAddProposal={proposal => addActionPlanProposal(id, proposal)} />
        <ProposalsTable 
          proposals={proposals}
          onRemoveProposal={proposal => removeActionPlanProposal(id, proposal)} />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ 
    addActionPlanProposal,
    removeActionPlanProposal,
    fetchActionPlanProposals 
  }, dispatch);
}

export default connect(null, mapDispatchToProps)(ActionPlanProposals);
