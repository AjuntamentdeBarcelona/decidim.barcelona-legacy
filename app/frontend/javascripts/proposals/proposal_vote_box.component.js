import { Component } from 'react';

export default class Votes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      totalVotes: 10,
      alreadyVoted: false,
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
              <a>{I18n.t("proposals.proposal.comments", { count: 20 })}</a>
            </div>
          </div>
          <div className="in-favor">
            {this.renderVoteButton()}
          </div>
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

  vote() {
    console.log("Not implemented...yet!");
    //this.setState({ loading: true });
    //$.ajax(this.props.vote_url, {
    //  method: 'POST',
    //  dataType: 'json'
    //}).then((data) => {
    //  this.setState({ 
    //    loading: false,
    //    totalVotes: this.state.totalVotes + 1,
    //    alreadyVoted: true
    //  });
    //});
  }
}
