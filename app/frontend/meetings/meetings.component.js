import { Component, PropTypes }              from 'react';
import { connect }                           from 'react-redux';

import InfinitePagination                    from '../pagination/infinite_pagination.component';
import MeetingsMap                           from './meetings_map.component';
import MeetingsFilters                       from './meetings_filters.component';
import MeetingsList                          from './meetings_list.component';

import { fetchMeetings, appendMeetingsPage } from './meetings.actions';
import { setFilterGroup }                    from '../filters/filters.actions';

class Meetings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true
    };
  }

  componentDidMount() {
    if(Object.keys(this.props.filters.filter).length === 0){
      this.props.setFilterGroup("date", ["past"]);
    } else {
      this.props.fetchMeetings({ filters: this.props.filters });
    }
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
              {this.renderInfinitePagination()}
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderInfinitePagination() {
    let infinitePaginationActive = !this.state.loading && 
      this.props.pagination.current_page < this.props.pagination.total_pages;

    if (infinitePaginationActive) {
      return (
        <InfinitePagination 
          onVisible={() => this.props.appendMeetingsPage({ 
            filters: this.props.filters, 
            page: this.props.pagination.current_page + 1
          })} /> 
      );
    }

    return null;
  }
}

export default connect(
  ({ meetings, filters, pagination }) => ({ meetings, filters, pagination }),
  {
    fetchMeetings,
    appendMeetingsPage,
    setFilterGroup
  }
)(Meetings);

Meetings.propTypes = {
  filters: PropTypes.object.isRequired,
  pagination: PropTypes.object.isRequired,
  meetings: PropTypes.array.isRequired,
  setFilterGroup: PropTypes.func.isRequired,
  fetchMeetings: PropTypes.func.isRequired,
  appendMeetingsPage: PropTypes.func.isRequired
};
