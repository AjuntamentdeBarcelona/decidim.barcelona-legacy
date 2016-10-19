import { Component, PropTypes } from 'react';
import { connect }              from 'react-redux';

import * as actions             from './filters.actions';

class TagCloudFilter extends Component {
  render() {
    return (
      <div className="filters__section">
        <ul id="tag-cloud" className="item-meta tags tags--proposal tag-cloud">
          {this.renderTitle()}
          {
            this.props.tags.map((tag) => {
            return <li key={tag.id}><a 
                className={this.props.filters.tags.indexOf(tag.name) !== -1 ? 'active' : ''}
                onClick={() => this.props.toggleTag(tag.name)}> 
                {tag.name}&nbsp;
                <span className="info">{tag.count}</span>
              </a></li>
            })
          }
        </ul>
      </div>
    );
  }

  
  renderTitle() {
    if(this.props.tags.length > 0) {
      return (
        <legend>
          <h6 className="title heading6">{I18n.t("shared.tags_cloud.tags")}</h6>
        </legend>
      )
    }
    return null;
  }
}

export default connect(
  ({ filters, tags }) => ({ filters, tags }),
  actions
)(TagCloudFilter);

TagCloudFilter.propTypes = {
  tags: PropTypes.array,
  filters: PropTypes.object.isRequired,
  toggleTag: PropTypes.func.isRequired
};
