import { Component }                from 'react';
import { bindActionCreators }       from 'redux';
import { connect }                  from 'react-redux';

import ProposalsTable               from '../proposals/proposals_table.component';

import { fetchActionPlanProposals } from './action_plans.actions';


class ActionPlanProposals extends Component {
  componentDidMount() {
    const { actionPlan } = this.props;

    this.props.fetchActionPlanProposals(actionPlan.id);
  }

  render() {
    const { actionPlan } = this.props;
    const proposals = actionPlan.proposals || [];

    if (proposals.length > 0) {
      return (
        <div>
          <h4>{I18n.t("components.action_plan_proposals.title")}</h4>
          <ProposalsTable proposals={proposals} />
        </div>
      );
    }
    return null;
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchActionPlanProposals }, dispatch);
}

export default connect(null, mapDispatchToProps)(ActionPlanProposals);
