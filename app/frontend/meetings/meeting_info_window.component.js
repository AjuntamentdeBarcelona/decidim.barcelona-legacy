import MeetingTime   from "./meeting_time.component";
import { PropTypes } from "react";

import htmlToReact   from '../application/html_to_react';

export default function MeetingInfoWindow ({ meeting }) {
  return (
    <div className="map-info__content">
      <h3>{ meeting.title }</h3>
      <div id="bodyContent">
        <div>{ htmlToReact(meeting.description) }</div>
        <div className="map__date-adress">
            <div className="card__datetime">
              <MeetingTime meeting={ meeting } relativeTime={true} />
            </div>
            <div className="address card__extra">
                <div className="address__icon">
                </div>
                <div className="address__details">
                  { (() => { if(meeting.address_details) {
                    return (
                      <div className="meeting-address-details">
                        <strong>{ meeting.address_details }</strong>
                      </div>
                    )
                  }})()}
                  <div className="meeting-address">{ meeting.address }</div>
                </div>
            </div>
        </div>
        <div className="map-info__button"><a href={ meeting.url } className="button button--sc">{I18n.t("components.meeting_info_window.show")}</a>
        </div>
      </div>
    </div>
  );
}

MeetingInfoWindow.propTypes = {
  meeting: PropTypes.object.isRequired
};
