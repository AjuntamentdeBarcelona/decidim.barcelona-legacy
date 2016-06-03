import { Component }                    from 'react';
import { connect }                      from 'react-redux';
import { bindActionCreators }           from 'redux';

import FlagActions                      from '../application/flag_actions.component';
import UserAvatar                       from '../application/user_avatar.component';

import ProposalAuthor                   from './proposal_author.component';

import { flagProposal, unFlagProposal } from './proposals.actions';

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
        <UserAvatar user={author} />
        <span className="bullet">&nbsp;&bull;&nbsp;</span>
        <ProposalAuthor 
          official={ official }
          fromMeeting={ fromMeeting }
          author={ author } />
        <span className="bullet">&nbsp;&bull;&nbsp;</span>
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

function mapStateToProps({ session }) {
  return { session };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ flagProposal, unFlagProposal }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProposalInfoExtended);
