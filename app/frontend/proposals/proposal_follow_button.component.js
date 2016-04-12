import { Component }          from 'react';
import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';

import { followProposal, unFollowProposal } from './proposals.actions';

export class ProposalFollowButton extends Component {
  render() {
    return (
      <div>
        {this.renderFollowButton()}
        {this.renderUnFollowButton()}
      </div>
    )
  }

  renderFollowButton() {
    const { proposal, followProposal } = this.props;
    const { id, followed } = proposal;

    if (!followed) {
      return (
        <button 
          className="follow"
          onClick={() => followProposal(id)}>
          Follow
        </button>
      );
    }
    return null;
  }

  renderUnFollowButton() {
    const { proposal, unFollowProposal } = this.props;
    const { id, followed } = proposal;

    if (followed) {
      return (
        <button 
          className="unfollow"
          onClick={() => unFollowProposal(id)}>
          Unfollow
        </button>
      );
    }

    return null;
  }
}

function mapStateToProps({ proposal }) {
  return { proposal };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ followProposal, unFollowProposal }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProposalFollowButton);
