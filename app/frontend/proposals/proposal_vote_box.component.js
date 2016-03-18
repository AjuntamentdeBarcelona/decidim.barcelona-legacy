import { Component }          from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';

import { voteProposal }       from './proposals.actions';

class ProposalVoteBox extends Component {
  render() {
    return (
      <div className="text-center">
        <div className="supports vote-box">
          <div className="support-progress">
            <span className="total-supports">
              <span className="supports-count">{ this.props.totalVotes }</span>
              {I18n.t("proposals.proposal.supports", { count: "" })}&nbsp;
            </span>
            <div className="proposal-comments">
              <i className="icon-comments"></i>&nbsp;
              <a>{I18n.t("proposals.proposal.comments", { count: this.props.totalComments })}</a>
            </div>
          </div>
          <div className="in-favor">
            {this.renderVoteButton()}
          </div>
          {this.renderShare()}
        </div>
      </div>
    )
  }

  renderVoteButton() {
    if(this.props.voted) { 
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
          onClick={() => { this.props.voteProposal(this.props.proposalId) }}>
          {I18n.t("proposals.proposal.support")}
        </button>
      )
    }
  }

  renderShare() {
      if(this.props.voted) { 
        return (
          <div className="share-supported">
            <div className="share-buttons">
              <div className="social-share-button">
                <a
                  rel="nofollow" 
                  data-site="twitter" 
                  className="social-share-button-twitter" 
                  onClick={(event) => { SocialShareButton.share(event.target) }} 
                  title="Comparteix a Twitter"/>
                <a
                  rel="nofollow" 
                  data-site="facebook" 
                  className="social-share-button-facebook" 
                  onClick={(event) => { SocialShareButton.share(event.target) }} 
                  title="Comparteix a Facebook"/>
                <a
                  rel="nofollow" 
                  data-site="google_plus" 
                  className="social-share-button-google_plus" 
                  onClick={(event) => { SocialShareButton.share(event.target) }} 
                  title="Comparteix a Google+"/>
              </div>
              <a 
                className="whatsapp-share" 
                href="whatsapp://send?text=#{proposal.title} #{proposal_url(proposal)}" 
                data-action="share/whatsapp/share">
                <i className="fa fa-whatsapp" />
              </a>
            </div>
          </div>
        )
      }
      return null;
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ voteProposal }, dispatch);
}

export default connect(null, mapDispatchToProps)(ProposalVoteBox);

//if(this.state.loading) {
//  return (
//    <div className="loading-component votes">
//      <span className="fa fa-spinner fa-spin"></span>
//    </div>
//  )
//} else {
//}
