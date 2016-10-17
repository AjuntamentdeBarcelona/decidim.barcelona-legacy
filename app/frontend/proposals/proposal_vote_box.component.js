import { Component, PropTypes } from 'react';
import { connect }              from 'react-redux';

import Icon                     from '../application/icon.component';
import SmartButton              from '../application/smart_button.component';
import SocialShareButtons       from '../application/social_share_buttons.component';

import * as actions             from './proposals.actions';

import htmlToReact              from '../application/html_to_react';

class ProposalVoteBox extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { proposalTitle, proposalUrl } = this.props;

    return (
      <div className="card__support">
        <div className="card__support__data">
          <span className="card__support__number">{ this.props.totalVotes }</span>
          {I18n.t("proposals.proposal.supports", { count: "" })}&nbsp;
          <div className="popularity popularity--level3">
            <span className="popularity__item"></span>
            <span className="popularity__item"></span>
            <span className="popularity__item"></span>
            <span className="popularity__item"></span>
            <span className="popularity__item"></span>
          </div>
        </div>

        {this.renderVoteButton(proposalTitle, proposalUrl)}
        
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
      </div>
    )
  }

  componentDidMount() {
    $('#loginModal').foundation();
  }

  renderVoteButton(title, url) {
    if (this.props.voted) { 
      return (
        <div className="card__button button small success">
          {I18n.t("proposals.proposal.already_supported")}
        </div>
      )
    } else {
      if (this.props.hideButton) {
        return <SocialShareButtons title={title} url={url} />
      } else if (this.props.votable) {
        return (
          <SmartButton 
            className="card__button button small" 
            title={I18n.t('proposals.proposal.support_title')}
            onClick={() => { this.props.voteProposal(this.props.proposalId) }}>
            {I18n.t("proposals.proposal.support")}
          </SmartButton>
        )
      } else {
        return (
          <button className="card__button button small"
            data-toggle="loginModal">
            {I18n.t("proposals.proposal.support")}
          </button>
        );
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
