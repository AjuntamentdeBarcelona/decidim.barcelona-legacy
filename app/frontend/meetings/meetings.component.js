import { Component }          from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';

import Loading                from '../application/loading.component';
import Pagination             from '../application/pagination.component';
import MeetingsMap            from './meetings_map.component';
import MeetingsFilters        from './meetings_filters.component';
import MeetingsList           from './meetings_list.component';

import { fetchMeetings }      from './meetings.actions';

class Meetings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true
    };
  }

  componentDidMount() {
    this.props.fetchMeetings({
      filters: this.props.filters
    });
  }

  componentWillReceiveProps({ filters }) {
    if (this.props.filters !== filters) {
      this.setState({ loading: true });
      this.props.fetchMeetings({ filters });
    } else {
      this.setState({ loading: false });
    }
  }

  render () {
    return (
      <div className="meetings-directory">
        <MeetingsMap className="meetings-map" meetings={this.props.meetings} />

        <div className="meetings-directory-content">
          <aside className="filters sidebar" role="complementary">
            <MeetingsFilters />
          </aside>

          <div className="meetings-list-container">
            <div className="meetings-list">
              <MeetingsList meetings={this.props.meetings} loading={this.state.loading} />
              <Pagination 
                currentPage={this.props.pagination.current_page} 
                totalPages={this.props.pagination.total_pages} 
                onSetCurrentPage={(page) => this.props.fetchMeetings({ filters: this.props.filters, page })} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ meetings, filters, pagination }) {
  return { meetings, filters, pagination };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchMeetings }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Meetings);
