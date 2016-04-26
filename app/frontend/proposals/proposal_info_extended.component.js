import { Component }                    from 'react';
import { connect }                      from 'react-redux';
import { bindActionCreators }           from 'redux';

import { flagProposal, unFlagProposal } from './proposals.actions';

import ProposalAuthor                   from './proposal_author.component';
import UserAvatar                       from '../application/user_avatar.component';

class ProposalInfoExtended extends Component {
  render() {
    const {
      code,
      created_at,
      official,
      fromMeeting,
      author,
      totalComments
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
        {this.renderFlagActions()}
      </p>
    );
  }

  renderFlagActions() {
    const { session, id, flagged, author } = this.props;

    if (session.signed_in && session.user.id !== author.id) {
      return (
        <span className="js-flag-actions">
          <span className="flag-content">
            {this.renderFlagAction(id, flagged)}
            {this.renderUnFlagAction(id, flagged)}
          </span>
        </span>
      );
    }

    return null;
  }

  renderFlagAction(id, flagged) {
    if (!flagged) {
      return (
        <a 
          id={`flag-proposal-${id}`}
          onClick={ () => this.props.flagProposal(id) }
          title={ I18n.t('shared.flag') }>
          &nbsp;<i className="icon-flag flag-disable"></i>&nbsp;&nbsp;
        </a>
      );
    }

    return null;
  }

  renderUnFlagAction(id, flagged) {
    if (flagged) {
      return (
        <a 
          id={`unflag-proposal-${id}`}
          onClick={ () => this.props.unFlagProposal(id) }
          title={ I18n.t('shared.unflag') }>
          &nbsp;<i className="icon-flag flag-active"></i>&nbsp;&nbsp;
        </a>
      );
    }

    return null;
  }
}

function mapStateToProps({ session }) {
  return { session };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ flagProposal, unFlagProposal }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProposalInfoExtended);
