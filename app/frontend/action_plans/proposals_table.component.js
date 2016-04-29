import { Component } from 'react';

import DangerLink    from '../application/danger_link.component';
import ProposalBadge from '../proposals/proposal_badge.component';
import ProposalLevelSelector from './proposal_level_selector.component';

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
                <td>
                    <ProposalBadge proposal={proposal} />
                </td>
                <td>
                    {proposal.code} - <a href={proposal.url} target="_blank">{proposal.title}</a>
                    <div>{proposal.summary}</div>
                </td>
                <td className="selector">
                  <ProposalLevelSelector
                    onChangeLevel={ (level) => this.props.onChangeLevel(proposal, level) }
                    selectedValue={ actionPlansProposal.level }
                  />
                </td>
                <td className="proposal-stats">
                    {I18n.t("components.action_plan_proposals.votes", { votes: proposal.total_votes})}
                    <br />
                    {I18n.t("components.action_plan_proposals.comments", { comments: proposal.total_comments})}
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
    if (this.props.onRemoveProposal) {
      return (
        <td>
          <DangerLink onClick={(event) => this.props.onRemoveProposal(proposal) }>
            {I18n.t("components.proposals_table.remove")}
          </DangerLink>
        </td>
      );
    }
    return null;
  }
}
