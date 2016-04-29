import { Component }              from 'react';
import { bindActionCreators }     from 'redux';
import { connect }                from 'react-redux';

import ProposalsAutocompleteInput from '../proposals/proposals_autocomplete_input.component';
import ProposalsTable             from './proposals_table.component';

import { 
  addActionPlanProposal,
  removeActionPlanProposal,
  changeActionPlansProposalLevel,
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
    const actionPlansProposals = actionPlan.actionPlansProposals || [];

    return (
      <div>
        <h4>{I18n.t("components.action_plan_proposals.title")}</h4>
        <ProposalsAutocompleteInput 
          proposalsApiUrl="/api/proposals"
          excludeIds={actionPlansProposals.map(a => a.proposal.id)}
          onAddProposal={proposal => addActionPlanProposal(id, proposal)} />
        <ProposalsTable 
          actionPlansProposals={ actionPlansProposals }
          onChangeLevel={ (proposal, level) => changeActionPlansProposalLevel(actionPlan, proposal, level) }
          onRemoveProposal={proposal => removeActionPlanProposal(id, proposal)} />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ 
    addActionPlanProposal,
    changeActionPlansProposalLevel,
    removeActionPlanProposal,
    fetchActionPlanProposals 
  }, dispatch);
}

export default connect(null, mapDispatchToProps)(ActionPlanProposals);
