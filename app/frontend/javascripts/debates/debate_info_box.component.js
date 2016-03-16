const formatDate = (date) => moment(date).format("L");
const formatTime = (date) => moment(date).format("LT");

export default ({ title, starts_at, ends_at}) => (
  <div className="debate-info-box">
    <span className="debate-date">{ formatDate(starts_at) }</span>
    <span className="start-time">{ formatTime(starts_at) }</span> - <span className="end-time">{ formatTime(ends_at) }</span>
  </div>
)
