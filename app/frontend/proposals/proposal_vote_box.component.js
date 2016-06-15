import { Component, PropTypes } from 'react';
import { connect }              from 'react-redux';

import SmartButton              from '../application/smart_button.component';
import SocialShareButtons       from '../application/social_share_buttons.component';

import * as actions             from './proposals.actions';

import htmlToReact              from '../application/html_to_react';

class ProposalVoteBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showCantVoteOverlay: false
    };
  }

  render() {
    return (
      <div className="text-center"
        onMouseLeave={() => { this.setState({ showCantVoteOverlay: false }) }}>
        <div className="supports vote-box">
          <div className="support-progress">
            <span className="total-supports">
              <span className="supports-count">{ this.props.totalVotes }</span>
              {I18n.t("proposals.proposal.supports", { count: "" })}&nbsp;
            </span>
            <div className="proposal-comments">
              <i className="icon-comments"></i>&nbsp;
              <a href={`${this.props.proposalUrl}#comments`}>{I18n.t("proposals.proposal.comments", { count: this.props.totalComments })}</a>
            </div>
          </div>
          <div className="in-favor">
            {this.renderVoteButton(this.props.proposalTitle, this.props.proposalUrl)}
          </div>
          {this.renderShareButtons(this.props.proposalTitle, this.props.proposalUrl)}
          {this.renderCantVoteOverlay()}
        </div>
      </div>
    )
  }

  renderVoteButton(title, url) {
    if(this.props.voted) { 
      return (
        <div className="supported">
          {I18n.t("proposals.proposal.already_supported")}
        </div>
      )
    } else {
      if (this.props.hideButton) {
        return <SocialShareButtons title={title} url={url} />
      } else {
        return (
          <SmartButton 
            className="button button-support tiny radius expand" 
            title={I18n.t('proposals.proposal.support_title')}
            onClick={() => { this.props.voteProposal(this.props.proposalId) }}
            onMouseEnter={() => { this.setState({ showCantVoteOverlay: true }) }}>
            {I18n.t("proposals.proposal.support")}
          </SmartButton>
        )
      }
    }
  }

  renderShareButtons(title, url) {
      if(this.props.voted) { 
        return (
          <SocialShareButtons title={title} url={url} />
        )
      }
      return null;
  }

  renderCantVoteOverlay() {
    let session = this.props.session,
        cantVote = !session.signed_in ||
          session.signed_in && !this.props.votable ||
          session.signed_in && session.is_organization;

    if (cantVote && this.state.showCantVoteOverlay) {
      if (session.signed_in && session.is_organization) {
        return (
          <div className="organizations-votes">
            <p>{ I18n.t("votes.organizations") }</p>
          </div>
        );
      } else if (session.signed_in && !this.props.votable) {
        return (
          <div className="anonymous-votes">
            {
              htmlToReact(
                I18n.t('votes.verified_only', {
                  verify_account: `<a href="/verification">${I18n.t("votes.verify_account")}</a>`
                })
              )
            }
          </div>
        );
      } else if (!session.signed_in) {
        return (
          <div className="not-logged">
            {
              htmlToReact(
                I18n.t('votes.unauthenticated', {
                  signin: `<a href="/users/sign_in">${I18n.t("votes.signin")}</a>`,
                  signup: `<a href="/users/sign_up">${I18n.t("votes.signup")}</a>`
                })
              )
            }
          </div>
        )
      }
    }
    return null;
  }
}

export default connect(
  ({ session }) => ({ session }),
  actions
)(ProposalVoteBox);

ProposalVoteBox.propTypes = {
  totalVotes: PropTypes.number.isRequired,
  proposalUrl: PropTypes.string.isRequired,
  proposalTitle: PropTypes.string.isRequired,
  totalComments: PropTypes.number.isRequired,
  voted: PropTypes.bool,
  hideButton: PropTypes.bool,
  session: PropTypes.object.isRequired,
  votable: PropTypes.bool,
  voteProposal: PropTypes.func.isRequired,
  proposalId: PropTypes.number.isRequired
};
