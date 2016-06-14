import { Component, PropTypes } from 'react';

export default class MeetingTime extends Component {
  constructor(props) {
    super(props);

    let meeting = props.meeting,
        startsAt,
        endsAt;

    if(meeting.start_at){
      startsAt = moment(meeting.held_at + " " + meeting.start_at, "DD/MM/YYYY HH:mm");
    }

    if(meeting.end_at){
      endsAt = moment(meeting.held_at + " " + meeting.end_at, "DD/MM/YYYY HH:mm");
    }

    this.state = {
      startsAt,
      endsAt
    };
  }

  render() {
    let meeting = this.props.meeting;
    let meetingDate = moment(meeting.held_at, "DD/MM/YYYY").format("LL");

    return (
      <div className="meeting-time">
        <div className="tags">
          <span className="meeting-held-at">
            <span className="meeting-held-at-date">{ meetingDate }</span>
            { this.renderTime(meeting) }
          </span>
        </div>
        { (() => { if (this.props.relativeTime) { return this.relativeTime() } })() }
      </div>
    );
  }

  relativeTime() {
    let { startsAt } = this.state;
    if(!startsAt) { return; }
    if(startsAt < moment()){ return; }

    return(
      <span className="relative-time">{ startsAt.fromNow() }</span>
    );
  }

  renderTime() {
    if(this.state.startsAt && this.state.endsAt){
      return(
        <span className="meeting-datetime">
          <span className="meeting-held-at-time">&nbsp;@&nbsp;{ this.state.startsAt.format("HH:mm") }&nbsp;-&nbsp;{ this.state.endsAt.format("HH:mm") }</span>
        </span>
      );
    } else {
      return null;
    }
  }
}

MeetingTime.propTypes = {
  meeting: PropTypes.object.isRequired,
  relativeTime: PropTypes.bool
};
