import { Component }              from 'react';
import { connect }                from 'react-redux';

import Loading                    from '../application/loading.component';

import ProposalsAutocompleteInput from '../proposals/proposals_autocomplete_input.component';
import ProposalsTable             from './proposals_table.component';

import * as actions               from './action_plans.actions';


class ActionPlanProposals extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true
    }
  }

  componentDidMount() {
    const { actionPlan, fetchActionPlanProposals } = this.props;

    fetchActionPlanProposals(actionPlan.id).then(() => {
      this.setState({ loading: false });
    });
  }

  render() {
    const { editable, actionPlan, addActionPlanProposal, removeActionPlanProposal } = this.props;
    const { id } = actionPlan;
    const actionPlansProposals = actionPlan.actionPlansProposals || [];

    return (
      <div className="action-plan-proposals-component">
        <h2>{I18n.t("components.action_plan_proposals.title")}</h2>
        {this.renderSearchProposalsInput(id, actionPlansProposals)}
        <Loading show={this.state.loading} />
        <ProposalsTable 
          actionPlansProposals={ actionPlansProposals }
          onChangeLevel={ (proposal, level) => changeActionPlansProposalLevel(actionPlan, proposal, level) }
          onRemoveProposal={proposal => removeActionPlanProposal(id, proposal)} 
          editable={editable} />
      </div>
    );
  }

  renderSearchProposalsInput(id, actionPlansProposals) {
    const {editable} = this.props;

    if (editable) {
      return (
        <ProposalsAutocompleteInput 
          proposalsApiUrl="/api/proposals"
          excludeIds={actionPlansProposals.map(a => a.proposal.id)}
          onAddProposal={proposal => addActionPlanProposal(id, proposal)} />
      );
    }

    return null;
  }
}

export default connect(null, actions)(ActionPlanProposals);
