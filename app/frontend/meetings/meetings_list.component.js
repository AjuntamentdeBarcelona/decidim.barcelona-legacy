import Loading from '../application/loading.component';
import Meeting from './meeting.component';

export default ({
  meetings,
  loading
}) => (
  <div>
    <Loading show={loading} />
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
