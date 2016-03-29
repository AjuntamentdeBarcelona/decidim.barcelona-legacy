import { Component } from 'react';

import MeetingTime   from './meeting_time.component';
import FilterLink    from '../filters/filter_link.component';

export default class Meeting extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { meeting } = this.props;

    return(
      <div className="meeting">
        <div className="meeting-inner">
          <div className="meeting-content">
            <a href={`/meetings/${meeting.slug}`} className="meeting-title" >
              { meeting.title }
            </a>
            <MeetingTime meeting={ meeting } relativeTime={true} />
            <p className="meeting-description">{ meeting.description }</p>
            { (() => { if(meeting.district) {
              return (
                <div className="district">
                  <strong>{ meeting.district.name }</strong>
                </div>
              )
            }})() }
            { (() => { if(meeting.address_details) {
              return (<div className="meeting-address-details"><i className="icon"></i> { meeting.address_details }</div>)
            }})()}
            <div className="meeting-address"><i className="icon"></i> { meeting.address }</div>
          </div>
          {this.renderMeetingCategory()}
        </div>
      </div>
    );
  }

  renderMeetingCategory() {
    let { meeting } = this.props;
    let { category, subcategory } = meeting;

    if(!meeting.category){ return <div />; }
    var categoryClassNames = `category-icon category-icon-${ meeting.category.id }`;

    return (
      <div className="item-meta">
        <FilterLink name="category_id" value={category.id} label={` ${category.name}`} cssClass={`category-icon category-icon-${category.id}`} />
        <FilterLink name="subcategory_id" value={subcategory.id} label={subcategory.name} />
      </div>
    );
  }
};
