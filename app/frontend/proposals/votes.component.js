//TODO: Deprecated when proposals#show use only components
import { Component } from 'react';

import SocialShareButtons from '../application/social_share_buttons.component';

export default class Votes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      totalVotes: this.props.total_votes,
      showCantVoteOverlay: false,
      alreadyVoted: this.props.already_voted,
      loading: false
    };
  }

  render() {
    return (
      <div 
        className="text-center"
        onMouseLeave={() => { this.setState({ showCantVoteOverlay: false }) }}>
        <div className="supports vote-box">
          <div className="support-progress">
            <span className="total-supports">
              <span className="supports-count">
                {this.state.totalVotes}
              </span>
              {I18n.t("proposals.proposal.supports", { count: "" })}&nbsp;
            </span>
            <div className="proposal-comments">
              <i className="icon-comments"></i>&nbsp;
              <a href={this.props.comments_url}>{I18n.t("proposals.proposal.comments", { count: this.props.comments_count})}</a>
            </div>
          </div>
          <div className="in-favor">
            {this.renderVoteButton()}
          </div>
          {this.renderShareButtons()}
          {this.renderCantVoteOverlay()}
        </div>
      </div>
    )
  }

  renderVoteButton() {
    if(this.state.loading) {
      return (
        <div className="loading-component votes">
          <span className="fa fa-spinner fa-spin"></span>
        </div>
      )
    } else {
      if(this.state.alreadyVoted) { 
        return (
          <div className="supported">
            {I18n.t("proposals.proposal.already_supported")}
          </div>
        )
      } else {
        return (
          <button 
            className="button button-support tiny radius expand" 
            title={I18n.t('proposals.proposal.support_title')}
            onClick={() => { this.vote() }}
            onMouseEnter={() => { this.setState({ showCantVoteOverlay: true }) }}>
            {I18n.t("proposals.proposal.support")}
          </button>
        )
      }
    }
  }

  renderCantVoteOverlay() {
    if (this.props.cant_vote && this.state.showCantVoteOverlay) {
      return (
        <div className="anonymous-votes">
          <p dangerouslySetInnerHTML={{__html: this.props.cant_vote_text }}></p>
        </div>
      );
    }
    return null;
  }

  renderShareButtons() {
      if(this.state.alreadyVoted) { 
        let { title, url } = this.props.proposal;

        return (
          <SocialShareButtons title={title} url={url} />
        )
      }
      return null;
  }

  vote() {
    this.setState({ loading: true });
    $.ajax(this.props.vote_url, {
      method: 'POST',
      dataType: 'json'
    }).then((data) => {
      this.setState({ 
        loading: false,
        totalVotes: this.state.totalVotes + 1,
        alreadyVoted: true
      });
    });
  }
}
