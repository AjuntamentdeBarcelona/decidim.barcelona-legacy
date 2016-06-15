import { PropTypes } from 'react';
import Meeting       from './meeting.component';

const MeetingsList = ({
  meetings
}) => (
  <div>
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
  meetings: PropTypes.array
};

export default MeetingsList;
