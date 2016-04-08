import { Component }            from 'react';
import { bindActionCreators }   from 'redux';
import { connect }              from 'react-redux';

import Meeting                  from '../meetings/meeting.component';

import { fetchRelatedMeetings } from './proposals.actions';

class ProposalMeetings extends Component {
  componentDidMount() {
    const { proposal } = this.props;

    this.props.fetchRelatedMeetings(proposal.id);
  }

  render() {
    return (
      <div className="row">
        <div className="small-12 medium-12 column">
          {this.renderMeetings()}
        </div>
      </div>
    );
  }

  renderMeetings() {
    const { proposal, useServerLinks } = this.props;
    const meetings = proposal.meetings || [];

    if (meetings.length > 0) {
      return (
        <div>
          <h2>{ I18n.t("proposals.show.meetings_title") }</h2>
          <div className="meetings-directory">
            <div className="meetings-list">
              <ul className="meetings-list-items">
                { 
                  meetings.map((meeting) => 
                    <li key={ meeting.id }>
                      <Meeting meeting={ meeting } useServerLinks={ useServerLinks } />
                    </li>
                  )
                }
              </ul>
            </div>
          </div>
        </div>
      );
    }
    return null;
  }
}

function mapStateToProps({ proposal }) {
  return { proposal };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchRelatedMeetings }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProposalMeetings);
