import { Component, PropTypes } from 'react';
import { connect }              from 'react-redux';

import FilterLink               from '../filters/filter_link.component';

class ProposalVoteLimit extends Component {
  render() {
    const { session, participatoryProcess } = this.props;
    const { step } = participatoryProcess;
    const { settings: { proposal_vote_limit } } = step;

    if (session.signed_in && proposal_vote_limit > 0) {
      const votesLeft = proposal_vote_limit - session.proposal_votes_count;

      return (
        <div className="row column proposal-vote-limit">
          <div className="callout secondary">
            <div className="row">
              <div className="columns medium-8 large-9">
                <h3 className="heading3">
                  {
                    I18n.t("components.proposal_vote_limit.title", { 
                      limit: proposal_vote_limit
                    })
                  }
                </h3>
                <p>
                  {
                    I18n.t("components.proposal_vote_limit.content", { 
                      limit: proposal_vote_limit
                    })
                  }
                </p>
                <p>
                  <FilterLink name="interaction" value="voted" label={I18n.t("components.proposal_vote_limit.view_my_votes")} />
                </p>
              </div>
              <div className="columns medium-4 large-3">
                <div className="card card--nomargin text-center">
                  <div className="card__content">
                    <span className="definition-data__title">
                      { I18n.t("components.proposal_vote_limit.left") }
                    </span>
                    <span className="extra__suport-number">{votesLeft}</span>
                    <span className="extra__suport-text">
                      { I18n.t("components.proposal_vote_limit.votes") }
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return null;
  }
}

ProposalVoteLimit.propTypes = {
  session: PropTypes.object.isRequired,
  participatoryProcess: PropTypes.object.isRequired
}

export default connect(
  ({ session, participatoryProcess }) => ({ session, participatoryProcess })
)(ProposalVoteLimit);

