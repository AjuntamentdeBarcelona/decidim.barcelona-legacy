import { Component, PropTypes } from 'react';
import { connect }              from 'react-redux';

import Icon                     from '../application/icon.component';
import SmartButton              from '../application/smart_button.component';

import * as actions             from './proposals.actions';

import htmlToReact              from '../application/html_to_react';

class ProposalVoteButton extends Component {
  componentDidMount() {
    $('#loginModal').foundation();
  }
  
  render() {
    return this.renderVoteButton();
  }

  renderVoteButton() {
    const { participatoryProcess, session } = this.props;
    const { step } = participatoryProcess;
    const { flags, settings } = step;
    const { proposal_vote_limit } = settings;
    const voteLimitReached = proposal_vote_limit > 0 && session.proposal_votes_count >= proposal_vote_limit;
    const votesDisabled = flags.proposals_readonly || !flags.enable_proposal_votes;

    if (this.props.voted) { 
      return (
        <button 
          className={`card__button button ${this.props.className || 'small'} success`}
          onMouseOver={(e) => {
            if (flags.enable_proposal_unvote) {
              $(e.target).toggleClass('warning');
              $(e.target).html(I18n.t("proposals.proposal.remove_support"));
            }
          }}
          onMouseOut={(e) => {
            if (flags.enable_proposal_unvote) {
              $(e.target).toggleClass('warning');
              $(e.target).html(I18n.t("proposals.proposal.already_supported"));
            }
          }}
          onClick={() => {
            if (flags.enable_proposal_unvote) {
              this.props.unVoteProposal(this.props.proposalId);
            }
          }}>
          {I18n.t("proposals.proposal.already_supported")}
        </button>
      )
    } else if (voteLimitReached) {
      return (
        <button className={`card__button button ${this.props.className || 'small'}`} disabled>
          {I18n.t("proposals.proposal.not_enough_votes")}
        </button>
      )
    } else if (votesDisabled) {
      return (
        <button className={`card__button button ${this.props.className || 'small'}`} disabled>
          {I18n.t("proposals.proposal.closed_support")}
        </button>
      )
    } else {
      if (this.props.votable) {
        return (
          <SmartButton 
            className={`card__button button ${this.props.className || 'small'}`} 
            title={I18n.t('proposals.proposal.support_title')}
            onClick={() => { this.props.voteProposal(this.props.proposalId) }}>
            {I18n.t("proposals.proposal.support")}
          </SmartButton>
        )
      } else {
        return (
          <div>
            <button className={`card__button button ${this.props.className || 'small'}`}
              data-toggle="loginModal">
              {I18n.t("proposals.proposal.support")}
            </button>
            {this.renderModal()}
          </div>
        );
      }
    }
  }

  renderModal() {
    return (
      <div className="reveal" id="loginModal" data-reveal="">
        <div className="reveal__header">
          <h3 className="reveal__title">{I18n.t("devise_views.sessions.new.title")}</h3>
          <button className="close-button" data-close="" aria-label="Close modal"
            type="button">
            <span aria-hidden="true">&times;</span>
          </button>
          {this.renderModalContent()}
        </div>
      </div>
    );
  }

  renderModalContent() {
    let session = this.props.session,
        cantVote = !session.signed_in ||
          session.signed_in && !this.props.votable ||
          session.signed_in && session.is_organization;

    if (cantVote) {
      if (session.signed_in && session.is_organization) {
        return (
          <div className="row organizations-votes">
            <div className="columns medium-8 medium-centered">
              <p>{ I18n.t("votes.organizations") }</p>
            </div>
          </div>
        );
      } else if (session.signed_in && !this.props.votable) {
        return (
          <div className="row anonymous-votes">
            <div className="columns medium-8 medium-centered">
              {
                htmlToReact(
                  I18n.t('votes.verified_only', {
                    verify_account: `<a href="/verification">${I18n.t("votes.verify_account")}</a>`
                  })
                )
              }
            </div>
          </div>
        );
      } else if (!session.signed_in) {
        return (
          <div>
            <div className="row">
              <div className="columns medium-8 medium-centered">
                <form action="/users/sign_in" className="register-form">
                  <div>
                    <div>
                      <label>{I18n.t("devise_views.sessions.new.email_label")}
                        <input type="email" name="user[email]" placeholder="exemple@domini.com" />
                      </label>
                    </div>
                    <div>
                      <label>{I18n.t("devise_views.sessions.new.password_label")}
                        <input type="password" name="user[password]" placeholder="Contrasenya" />
                      </label>
                    </div>
                  </div>
                  <fieldset>
                    <label>
                      <input type="checkbox" />
                      {I18n.t("devise_views.sessions.new.remember_me")}
                    </label>
                  </fieldset>
                  <button type="submit" className="button expanded">{I18n.t("devise_views.sessions.new.submit")}</button>
                </form>
                <p className="text-center">
                  {htmlToReact(
                    I18n.t('votes.unauthenticated', {
                      signin: `<a href="/users/sign_in">${I18n.t("votes.signin")}</a>`,
                      signup: `<a href="/users/sign_up">${I18n.t("votes.signup")}</a>`
                    })
                  )}
                </p>
              </div>
            </div>
            <div className="row">
              <div className="columns medium-8 medium-centered">
                <span className="register__separator">
                  <span className="register__separator__text">o bé</span>
                </span>
                <div className="social-register">
                  <a className="button button--social button--twitter" href="/users/auth/twitter">
                    <span className="button--social__icon">
                      <Icon name="twitter" />
                    </span>
                    {I18n.t("omniauth.twitter.sign_in")}
                  </a>
                  <a className="button button--social button--facebook" href="/users/auth/facebook">
                    <span className="button--social__icon">
                      <Icon name="facebook" />
                    </span>
                    {I18n.t("omniauth.facebook.sign_in")}
                  </a>
                  <a className="button button--social button--google_oauth2" href="/users/auth/google_oauth2">
                    <span className="button--social__icon">
                      <Icon name="google" />
                    </span>
                    {I18n.t("omniauth.google_oauth2.sign_in")}
                  </a>
                </div>
                <span className="register__separator">
                  <span className="register__separator__text"></span>
                </span>
              </div>
            </div>
          </div>
        )
      }
    }
    return null;
  }
}

export default connect(
  ({ participatoryProcess, session }) => ({ participatoryProcess, session }),
  actions
)(ProposalVoteButton);

ProposalVoteButton.propTypes = {
  participatoryProcess: PropTypes.object.isRequired,
  className: PropTypes.string,
  voted: PropTypes.bool.isRequired,
  votable: PropTypes.bool,
  session: PropTypes.object.isRequired,
  voteProposal: PropTypes.func.isRequired,
  unVoteProposal: PropTypes.func.isRequired,
  proposalId: PropTypes.number.isRequired
};
