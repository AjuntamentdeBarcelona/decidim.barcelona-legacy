import { Component, PropTypes } from 'react';

import Icon                     from '../application/icon.component';

import MeetingTime              from './meeting_time.component';
import FilterLink               from '../filters/filter_link.component';
import FilterServerLink         from '../filters/filter_server_link.component';

import htmlToReact              from '../application/html_to_react';

export default class Meeting extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { meeting } = this.props;

    return(
      <div className="meeting column">
        <article className="card card--meeting">
          <div className="card__content">
            <a href={meeting.url} className="card__link">
              <h5 className="card__title meeting-title">{ meeting.title }</h5>
            </a>
            <div className="card__datetime">
              <MeetingTime meeting={ meeting } relativeTime={true} />
            </div>
            <div>{ htmlToReact(meeting.description) }</div><br />
            <div className="address card__extra">
              <div className="address__icon">
                <Icon name="meetings" removeIconClass={true} width="40" height="70" />
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
        </article>
      </div>
    );
  }

  renderMeetingCategory() {
    let { meeting, useServerLinks } = this.props;
    let { category, subcategory } = meeting;

    if(!meeting.category){ return <div />; }

    if (useServerLinks) {
      return (
        <div className="item-meta">
          <FilterServerLink namespace="meetings" name="category_id" value={category.id} label={` ${category.name}`} cssClass={`category-icon category-icon-${category.id}`} />
          <FilterServerLink namespace="meetings" name="subcategory_id" value={subcategory.id} label={subcategory.name} />
        </div>
      );
    } else {
      return (
        <div className="item-meta">
          <FilterLink name="category_id" value={category.id} label={` ${category.name}`} cssClass={`category-icon category-icon-${category.id}`} />
          <FilterLink name="subcategory_id" value={subcategory.id} label={subcategory.name} />
        </div>
      );
    }
  }
}

Meeting.propTypes = {
  meeting: PropTypes.object.isRequired,
  useServerLinks: PropTypes.bool
};
