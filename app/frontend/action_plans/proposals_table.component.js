import { Component, PropTypes } from 'react';

import DangerLink               from '../application/danger_link.component';
import ProposalBadge            from '../proposals/proposal_badge.component';

export default class ActionPlanProposalsTable extends Component {
  render() {
    const { actionPlansProposals } = this.props;

    return (
      <table className="proposals-table">
        <tbody>
          {
            actionPlansProposals.sort((a, b) => b.proposal.total_votes - a.proposal.total_votes).map(actionPlansProposal => {
              let proposal = actionPlansProposal.proposal;
              return (
                <tr key={proposal.id}>
                <td className="proposal-badge-cell">
                    <ProposalBadge proposal={proposal} />
                </td>
                <td>
                    {proposal.code} - <a href={proposal.url} target="_blank">{proposal.title}</a>
                    <div className="proposal-summary">{proposal.summary}</div>
                </td>
                <td className="proposal-stats">
                  <ul>
                    <li>{I18n.t("components.action_plan_proposals.votes", { votes: proposal.total_votes})}</li>
                    <li>{I18n.t("components.action_plan_proposals.comments", { comments: proposal.total_comments})}</li>
                  </ul>
                </td>
                {this.renderRemoveButton(proposal)}
                </tr>
              )
              })
          }
        </tbody>
      </table>
    );
  }

  renderRemoveButton(proposal) {
    const {onRemoveProposal, editable} = this.props;

    if (editable && onRemoveProposal) {
      return (
        <td>
          <DangerLink onClick={() => onRemoveProposal(proposal) }>
            {I18n.t("components.proposals_table.remove")}
          </DangerLink>
        </td>
      );
    }
    return null;
  }
}

ActionPlanProposalsTable.propTypes = {
  actionPlansProposals: PropTypes.array.isRequired,
  onRemoveProposal: PropTypes.func,
  editable: PropTypes.bool
};
