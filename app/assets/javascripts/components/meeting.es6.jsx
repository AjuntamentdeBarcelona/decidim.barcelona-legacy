class Meeting extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let meeting = this.props.meeting;

    return(
      <div className="meeting">
        <div className="meeting-inner">
          <div className="meeting-content">
            <a href={`/meetings/${meeting.slug}`} className="meeting-title" >
              { meeting.title }
            </a>
            <div className="tags">
              {this.renderMeetingHeldAt(meeting)}
            </div>
            <p className="meeting-description">{ meeting.description }</p>
            <div className="meeting-address"><i className="icon"></i> { meeting.address }</div>
          </div>
          {this.renderMeetingCategory(meeting)}
        </div>
      </div>
    )
  }

  renderMeetingCategory(meeting) {
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
    )
  }

  renderMeetingHeldAt(meeting) {
    let meetingDate = moment(meeting.held_at, "DD/MM/YYYY").format("LL");
    let startsAt = moment(meeting.held_at + " " + meeting.start_at, "DD/MM/YYYY HH:mm").format("HH:mm");
    let endsAt = moment(meeting.held_at + " " + meeting.end_at, "DD/MM/YYYY HH:mm").format("HH:mm");

    return (
      <span className="meeting-held-at">
        <span className="meeting-held-at-date">{ meetingDate }</span>
        <span className="meeting-held-at-time">&nbsp;@&nbsp;{ startsAt }&nbsp;-&nbsp;{ endsAt }</span>
      </span>
    )
  }
};
