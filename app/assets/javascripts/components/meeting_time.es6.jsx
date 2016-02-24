class MeetingTime extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    let meeting = props.meeting;

    if(meeting.start_at){
      this.state.startsAt = moment(meeting.held_at + " " + meeting.start_at, "DD/MM/YYYY HH:mm");
    }

    if(meeting.end_at){
      this.state.endsAt = moment(meeting.held_at + " " + meeting.end_at, "DD/MM/YYYY HH:mm");
    }
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
