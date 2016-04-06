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
    const { proposal } = this.props;
    const meetings = proposal.meetings || [];

    return (
      <div className="row">
        <div className="small-12 medium-12 column">
          <h2>{ I18n.t("proposals.show.meetings_title") }</h2>
          <div className="meetings-directory">
            <div className="meetings-list">
              <ul className="meetings-list-items">
                { 
                  meetings.map((meeting) => 
                    <li key={ meeting.id }>
                      <Meeting meeting={ meeting } />
                    </li>
                  )
                }
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ proposal }) {
  return { proposal };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchRelatedMeetings }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProposalMeetings);
