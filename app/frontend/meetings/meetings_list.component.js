import { PropTypes } from 'react';

import Loading       from '../application/loading.component';
import Meeting       from './meeting.component';

const MeetingsList = ({
  meetings,
  loading
}) => (
  <div>
    <Loading show={loading} list={true} />
    <ul className="meetings-list-items">
      {
        meetings.map((meeting) => (
          <li key={ `meeting_${meeting.slug}` } >
            <Meeting meeting={ meeting } />
          </li>
        ))
      }
    </ul>
  </div>
);

MeetingsList.propTypes = {
  meetings: PropTypes.array,
  loading: PropTypes.bool
};

export default MeetingsList;
