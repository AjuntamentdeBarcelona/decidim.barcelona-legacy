class MeetingsCarousel extends Carousel {
  constructor(props) {
    super(props);
  }

  renderItem(meeting){
    return (
      <div className="carousel-meeting">
        <a className="meeting-title" href={meeting.url}>
          { this.trim(meeting.title, 45) }
        </a>
        <MeetingTime meeting={meeting} />
        <p className="meeting-description">
          { this.trim(meeting.description, 70) }
        </p>

        <div className="meeting-address">
          { meeting.address}
        </div>
      </div>
    )
  }
}
