class Votes extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showCantVoteOverlay: false,
      alreadyVoted: this.props.already_voted
    };
  }

  render() {
    return (
      <div 
        className="small-12 medium-3 column text-center"
        onMouseLeave={() => { this.setState({ showCantVoteOverlay: false }) }}>
        <div className="supports vote-box">
          <div className="support-progress">
            <span className="total-supports">
              <span className="supports-count">
                {this.props.total_votes}
              </span>
              supports&nbsp;
            </span>
            <div className="proposal-comments">
              <i className="icon-comments"></i>&nbsp;
              <a>9999 Comments</a>
            </div>
          </div>
          <div className="in-favor">
            {this.renderVoteButton()}
          </div>
          {this.renderCantVoteOverlay()}
        </div>
      </div>
    )
  }

  renderVoteButton() {
    if(this.state.alreadyVoted) { 
      return (
        <div className="supported">
          Already supported
        </div>
      )
    } else {
      return (
        <button 
          className="button button-support tiny radius expand" 
          onClick={() => { this.vote() }}
          onMouseEnter={() => { this.setState({ showCantVoteOverlay: true }) }}>
          Support
        </button>
      )
    }
  }

  renderCantVoteOverlay() {
    if (this.props.cant_vote && this.state.showCantVoteOverlay) {
      return (
        <div className="anonymous-votes">
          <p>Verified only!</p>
        </div>
      );
    }
    return null;
  }

  vote() {
    this.setState({ alreadyVoted: true });
  }
}
//  <% if voted_for?(@proposal_votes, proposal) && Setting['twitter_handle'] %>
//    <div class="share-supported">
//      <%= share_button_for(proposal) %>
//    </div>
//  <% end %>
