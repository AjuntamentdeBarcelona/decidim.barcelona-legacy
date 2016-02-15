class Meeting extends React.Component {
  constructor(props) {
    super(props);
    let meeting = props.meeting;

    this.state = { meeting: meeting };

    if(this.state.meeting.start_at){
      this.state.startsAt = moment(meeting.held_at + " " + meeting.start_at, "DD/MM/YYYY HH:mm");
    }

    if(this.state.meeting.end_at){
      this.state.endsAt = moment(meeting.held_at + " " + meeting.end_at, "DD/MM/YYYY HH:mm");
    }
  }

  render() {
    let meeting = this.state.meeting;

    return(
      <div className="meeting">
        <div className="meeting-inner">
          <div className="meeting-content">
            <a href={`/meetings/${meeting.slug}`} className="meeting-title" >
              { meeting.title }
            </a>
            <div className="tags">
              {this.renderMeetingHeldAt()}
            </div>
            { this.relativeTime() }
            <p className="meeting-description">{ meeting.description }</p>
            <div className="meeting-address"><i className="icon"></i> { meeting.address }</div>
          </div>
          {this.renderMeetingCategory()}
        </div>
      </div>
    );
  }

  renderMeetingCategory() {
    let meeting = this.state.meeting;
    if(!meeting.category){ return <div />; }
    var categoryClassNames = `category-icon category-icon-${ meeting.category.id }`;

    return (
      <div className="item-meta">
        <span className="category">
          <i className={ categoryClassNames }></i>&nbsp;
          { meeting.category.name }
        </span>
        <span className="subcategory">
          { meeting.subcategory.name }
        </span>
      </div>
    );
  }

  renderMeetingHeldAt() {
    let meeting = this.state.meeting;
    let meetingDate = moment(meeting.held_at, "DD/MM/YYYY").format("LL");

    return (
      <span className="meeting-held-at">
        <span className="meeting-held-at-date">{ meetingDate }</span>
        { this.renderMeetingTime(meeting) }
      </span>
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

  renderMeetingTime() {
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
};
