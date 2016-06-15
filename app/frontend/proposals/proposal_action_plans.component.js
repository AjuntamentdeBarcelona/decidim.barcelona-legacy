import { Component, PropTypes } from 'react';
import { connect }              from 'react-redux';

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
          <h3>{ I18n.t('components.action_plans.title') }</h3>
          <ul className="related-action-plans">
            {
              actionPlans.map(actionPlan => 
                <li key={actionPlan.id}>
                  <a href={actionPlan.url}>{actionPlan.title}</a>
                </li>
              )
            }
          </ul>
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
