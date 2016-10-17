import { Component, PropTypes } from 'react';
import { connect }              from 'react-redux';

import Icon                     from '../application/icon.component';
import FlagActions              from '../application/flag_actions.component';

import ProposalInfo             from './proposal_info.component';

import * as actions             from './proposals.actions';

class ProposalInfoExtended extends Component {
  render() {
    const {
      id,
      created_at,
      author,
      totalComments,
      flagged,
      flagProposal,
      unFlagProposal
    } = this.props;

    return (
      <ProposalInfo created_at={created_at} author={author}>
        <div className="author-data__extra">
          <a href="#comments" title="Comentarios">
            <Icon name="comment-square" className="icon--small" ariaLabel= "Comentarios" role="img" />
            {' ' + totalComments}
          </a>
        </div>
        <FlagActions
          flaggeable={{id, flagged, author}}
          flagAction={flagProposal}
          unFlagAction={unFlagProposal}
        />
      </ProposalInfo>
    );
  }
}

export default connect(
  ({ session }) => ({ session }),
  actions
)(ProposalInfoExtended);

ProposalInfoExtended.propTypes = {
  id: PropTypes.number.isRequired,
  created_at: PropTypes.string.isRequired,
  author: PropTypes.object,
  totalComments: PropTypes.number.isRequired,
  flagged: PropTypes.bool,
  flagProposal: PropTypes.func.isRequired,
  unFlagProposal: PropTypes.func.isRequired
};
