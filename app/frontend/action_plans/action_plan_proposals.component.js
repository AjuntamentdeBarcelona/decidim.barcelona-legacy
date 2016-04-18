import { Component }                from 'react';
import { bindActionCreators }       from 'redux';
import { connect }                  from 'react-redux';

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
        <div className="references">
          <p>{ I18n.t('components.action_plan_show.references') }</p>
          <ul className="references-list">
            {
              proposals.map(proposal => 
                <li key={proposal.id}><a href={proposal.url}>{proposal.title}</a></li>
              )
            }
          </ul>
        </div>
      );
    }
    return null;
  }
}

function mapStateToProps({ proposal }) {
  return { proposal };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchActionPlanProposals }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ActionPlanProposals);
