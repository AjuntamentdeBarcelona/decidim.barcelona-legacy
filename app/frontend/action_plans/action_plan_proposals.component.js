import { Component }                from 'react';
import { bindActionCreators }       from 'redux';
import { connect }                  from 'react-redux';

import { fetchActionPlanProposals } from './action_plans.actions';
import ProposalBadge                from '../proposals/proposal_badge.component';


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
          <table>
            <tbody>
              {
                proposals.map(proposal =>
                  <tr key={proposal.id}>
                    <td>
                      <ProposalBadge proposal={proposal} />
                    </td>
                    <td>
                      <a href={proposal.url}>{proposal.title}</a>
                    </td>
                    <td>{I18n.t("components.action_plan_proposals.votes", { votes: proposal.total_votes})}</td>
                    <td>{I18n.t("components.action_plan_proposals.comments", { comments: proposal.total_votes})}</td>
                  </tr>
                )
              }
            </tbody>
          </table>
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
