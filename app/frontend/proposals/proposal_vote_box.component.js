import { Component, PropTypes } from 'react';

import ProposalVoteButton       from './proposal_vote_button.component';

export default class ProposalVoteBox extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="card__support">
        <div className="card__support__data">
          <span className="card__support__number">{ this.props.totalVotes }</span>
          {I18n.t("proposals.proposal.supports", { count: "" })}&nbsp;
        </div>

        <ProposalVoteButton
          voted={this.props.voted}
          votable={this.props.votable}
          proposalId={this.props.proposalId}
        />
      </div>
    )
  }
}

ProposalVoteBox.propTypes = {
  totalVotes: PropTypes.number.isRequired,
  voted: PropTypes.bool,
  votable: PropTypes.bool,
  proposalId: PropTypes.number.isRequired
};
