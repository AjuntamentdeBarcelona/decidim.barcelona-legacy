import { Component, PropTypes } from 'react';
import { connect }              from 'react-redux';

import FlagActions              from '../application/flag_actions.component';
import UserAvatar               from '../application/user_avatar.component';

import ProposalAuthor           from './proposal_author.component';

import * as actions             from './proposals.actions';

class ProposalInfoExtended extends Component {
  render() {
    const {
      id,
      code,
      created_at,
      official,
      fromMeeting,
      author,
      totalComments,
      flagged,
      flagProposal,
      unFlagProposal
    } = this.props;

    return (
      <p className="proposal-info extended">
        {(() => {
          if(author) {
            return (
              <span>
                <UserAvatar user={author} />
                <span className="bullet">&nbsp;&bull;&nbsp;</span>
                <ProposalAuthor 
                  official={ official }
                  fromMeeting={ fromMeeting }
                  author={ author } />
                <span className="bullet">&nbsp;&bull;&nbsp;</span>
              </span>
            );
          }
        })()}
        <span>{ code }</span>
        <span className="bullet">&nbsp;&bull;&nbsp;</span>
        <span>{ created_at }</span>
        <span className="bullet">&nbsp;&bull;&nbsp;</span>
        <i className="icon-comments"></i>&nbsp;
        <a href="#comments">{ I18n.t('proposals.show.comments', { count: totalComments }) }</a>
        <span className="bullet">&nbsp;&bull;&nbsp;</span>
        <FlagActions 
          flaggeable={{id, flagged, author}}
          flagAction={flagProposal}
          unFlagAction={unFlagProposal}
        />
      </p>
    );
  }
}

export default connect(
  ({ session }) => ({ session }),
  actions
)(ProposalInfoExtended);

ProposalInfoExtended.propTypes = {
  id: PropTypes.number.isRequired,
  code: PropTypes.string.isRequired,
  created_at: PropTypes.string.isRequired,
  official: PropTypes.bool,
  fromMeeting: PropTypes.bool,
  author: PropTypes.object,
  totalComments: PropTypes.number.isRequired,
  flagged: PropTypes.bool,
  flagProposal: PropTypes.func.isRequired,
  unFlagProposal: PropTypes.func.isRequired
};
