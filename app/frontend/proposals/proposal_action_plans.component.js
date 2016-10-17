import { Component, PropTypes } from 'react';
import { connect }              from 'react-redux';
import ActionPlanStatistics     from '../action_plans/action_plan_statistics.component';
import htmlToReact              from '../application/html_to_react';

import Icon                     from '../application/icon.component';

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
        <div>
          <h3 className="section-heading">Proposta recollida als següents presultats:</h3>

          <div className="card card--action card--list">
            {
              actionPlans.map(actionPlan =>
                <div key={actionPlan.id} className="card--list__item">
                  <Icon name="actions" removeIconClass={true} className="card--list__icon" />
                  <a href={actionPlan.url} className="card--list__text card__link card__link--block">
                    <h5 className="card--list__heading">
                      {actionPlan.title}
                    </h5>
                  </a>
                  <div className="card--list__data">
                    <span className="card--list__data__number">{actionPlan.statistics.supports_count}</span>{I18n.t("proposals.proposal.supports", { count: "" })}
                  </div>
                </div>
              )
            }
          </div>
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

//  <div className="proposal-action-plans">
//           <table className="related-action-plans">
//             {
//               actionPlans.map(actionPlan => 
//                 <tr key={actionPlan.id}>
//                   <td className="action-plan-title">
//                     <a href={actionPlan.url}>
//                       {actionPlan.title}
//                     </a>
//                     {htmlToReact(actionPlan.description)}
//                   </td>
//                   <td>
//                     <ActionPlanStatistics
//                     statistics={actionPlan.statistics} />
//                   </td>
//                 </tr>
//               )
//             }
//           </table>
//         </div>