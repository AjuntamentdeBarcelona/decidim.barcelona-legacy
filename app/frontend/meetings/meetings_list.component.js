import Meeting from './meeting.component';

export default ({
  meetings
}) => (
  <div className="meetings-list">
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
