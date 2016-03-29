import { Component } from 'react';

import Loading       from '../application/loading.component';
import Pagination    from '../application/pagination.component';
import Meeting       from './meeting.component';

export default class MeetingsList extends Component {
  //constructor(props) {
  //  super(props);

  //  this.state = {
  //    currentPage: 1
  //  };
  //}

  render () {
  //  let begin = (this.state.currentPage - 1) * this.props.perPage,
  //      end = begin + this.props.perPage,
  //      meetings = this.props.meetings.slice(begin, end);

    return (
        <div>In progress</div>
  //    <div className="meetings-list">
  //      <Loading show={this.props.loading} />
  //      <ul className="meetings-list-items">
  //        {
  //          meetings.map((meeting) => {
  //            return (
  //              <li key={ `meeting_${meeting.slug}` } >
  //                <Meeting meeting={ meeting } />
  //              </li>
  //            )
  //          })
  //        }
  //      </ul>
  //      <Pagination 
  //        className="pagination"
  //        currentPage={this.state.currentPage}
  //        totalPages={Math.ceil(this.props.meetings.length / this.props.perPage)}
  //        onSetCurrentPage={(page) => this.setCurrentPage(page)} />
  //    </div>
    );
  }

  //setCurrentPage(page) {
  //  this.setState({ currentPage: page });
  //}
}

MeetingsList.defaultProps = { 
  perPage: 12
};
