import { Component, PropTypes } from 'react';

import Icon                     from '../application/icon.component';

import htmlToReact              from '../application/html_to_react';

export default class RelatedMeetings extends Component {
  componentDidMount() {
    const { model } = this.props;

    this.props.fetchRelatedMeetings(model.id);
  }

  render() {
    const { model } = this.props;
    const meetings = model.meetings || [];

    if (meetings.length > 0) {
      return (
        <div>
          <h3 className="section-heading">{ I18n.t("proposals.show.meetings_title") }</h3>
          <div className="row small-up-1 medium-up-2 card-grid">
            { 
              meetings.map((meeting) => 
                <div className="column" key={ meeting.id }>
                  <article className="card card--meeting">
                    <div className="card__content">
                      <div className="card__header">
                        <h5 className="card__title">
                          <a href={meeting.url} className="card__link">
                            {meeting.title}
                          </a>
                        </h5>
                      </div>
                      <div className="card__datetime">
                        <div className="card__datetime__date">
                          {meeting.held_at}
                        </div>
                        <div className="card__datetime__time">
                          {meeting.start_at} - {meeting.end_at}
                        </div>
                      </div>
                      <div>{ htmlToReact(meeting.description) }</div><br />
                      <div className="address card__extra">
                        <div className="address__icon">
                          <Icon name="meetings" removeIconClass={true} width="40" height="70" />
                        </div>
                        <div className="address__details">
                          <strong>{meeting.address}</strong><br/>
                          <span>{meeting.address_details}</span>
                        </div>
                      </div>
                    </div>
                  </article>
                </div>
              )
            }
          </div>
        </div>
      );
    }
    return null;
  }
}

RelatedMeetings.propTypes = {
  model: PropTypes.object.isRequired,
  fetchRelatedMeetings: PropTypes.func.isRequired,
  useServerLinks: PropTypes.bool
};
