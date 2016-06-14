import { PropTypes } from 'react';

const formatDate = (date) => moment(date).format("L");
const formatTime = (date) => moment(date).format("LT");

const DebateInfoBox = ({ starts_at, ends_at}) => (
  <div className="debate-info-box">
    <span className="debate-date">{ formatDate(starts_at) }</span>
    <span className="start-time">{ formatTime(starts_at) }</span> - <span className="end-time">{ formatTime(ends_at) }</span>
  </div>
)

DebateInfoBox.propTypes = {
  starts_at: PropTypes.string.isRequired,
  ends_at: PropTypes.string.isRequired
};

export default DebateInfoBox;
