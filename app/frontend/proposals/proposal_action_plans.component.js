import { Component, PropTypes } from 'react';
import { connect }              from 'react-redux';
import ActionPlanStatistics     from '../action_plans/action_plan_statistics.component';
import htmlToReact              from '../application/html_to_react';

import * as actions             from './proposals.actions';

class ProposalActionPlans extends Component {
  componentDidMount() {
    const { proposal } = this.props;

    this.props.fetchActionPlans(proposal.id);
  }

  render() {
    const { proposal } = this.props;
    const actionPlans = proposal.actionPlans || [];

    if (actionPlans.length > 0) {
      return (
        <div className="proposal-action-plans">
          <table className="related-action-plans">
            {
              actionPlans.map(actionPlan => 
                <tr key={actionPlan.id}>
                  <td className="action-plan-title">
                    <a href={actionPlan.url}>
                      {actionPlan.title}
                    </a>
                    {htmlToReact(actionPlan.description)}
                  </td>
                  <td>
                    <ActionPlanStatistics
                    statistics={actionPlan.statistics} />
                  </td>
                </tr>
              )
            }
          </table>
        </div>
      );
    }
    return null;
  }
}

export default connect(
  ({ proposal }) => ({ proposal }),
  actions
)(ProposalActionPlans);

ProposalActionPlans.propTypes = {
  proposal: PropTypes.object.isRequired,
  fetchActionPlans: PropTypes.func.isRequired
};
