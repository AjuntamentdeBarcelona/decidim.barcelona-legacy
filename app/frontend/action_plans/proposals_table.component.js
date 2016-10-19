import { Component, PropTypes } from 'react';

import Icon                     from '../application/icon.component';
import UserAvatar               from '../application/user_avatar.component';
import DangerLink               from '../application/danger_link.component';

export default class ActionPlanProposalsTable extends Component {
  render() {
    const { actionPlansProposals } = this.props;

    return (
      <div className="card card--action card--list">
        {
          actionPlansProposals.sort((a, b) => b.proposal.total_votes - a.proposal.total_votes).map(actionPlansProposal => {
            const { proposal } = actionPlansProposal;
            const { author } = proposal;

            const authorUrl = author ? `/users/${author.id}` : '#';

            return (
              <div className="card--list__item">
                <div className="card--list__text">
                  <a href={proposal.url}>
                    <Icon name="proposals" className="card--list__icon" removeIconClass={true} />
                  </a>
                  <div>
                    <a href={proposal.url} className="card__link">
                      <h5 className="card--list__heading">
                        {proposal.title}
                      </h5>
                    </a>
                    <div className="author">
                      <a href={authorUrl} className="author__avatar">
                        <UserAvatar user={author} />
                      </a>
                      <a href={authorUrl} className="author__name">
                        { author ? author.name : 'no user' }
                      </a>
                    </div>
                  </div>
                </div>
                <div className="card--list__data">
                  <span className="card--list__data__number">{proposal.total_votes}</span>
                  {I18n.t("components.action_plan_proposals.votes", { votes: ""})}
                </div>
              </div>
            )
          })
        }
      </div>
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
