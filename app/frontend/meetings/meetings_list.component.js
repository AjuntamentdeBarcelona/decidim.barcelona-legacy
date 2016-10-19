import { PropTypes } from 'react';
import Meeting       from './meeting.component';

const MeetingsList = ({
  meetings
}) => (
  <div id="meetings" className="meetings-list row small-up-1 medium-up-2 mediumlarge-up-1 large-up-2 card-grid">
    {
      meetings.map((meeting) => (
        <Meeting key={ `meeting_${meeting.slug}` } meeting={ meeting } />
      ))
    }
  </div>
);

MeetingsList.propTypes = {
  meetings: PropTypes.array
};

export default MeetingsList;
