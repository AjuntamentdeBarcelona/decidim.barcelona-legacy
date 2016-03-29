import { Component }          from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';

import { toggleTag }          from './filters.actions';

class TagCloudFilter extends Component {
  render() {
    return (
      <div id="tag-cloud" className="tag-cloud">
        {this.renderTitle()}
        {
          this.props.tags.map((tag) => {
          return <a 
              className={this.props.filters.tags.indexOf(tag.name) !== -1 ? 'active' : ''}
              onClick={() => this.props.toggleTag(tag.name)}
              key={tag.id}> 
              {tag.name}&nbsp;
              <span className="info">{tag.count}</span>
            </a>
          })
        }
      </div>
    );
  }

  
  renderTitle() {
    if(this.props.tags.length > 0) {
      return (
        <div>
          <h3 className="title">{I18n.t("shared.tags_cloud.tags")}</h3>
          <br></br>
        </div>
      )
    }
    return null;
  }
}

function mapStateToProps({ filters, tags }) {
  return {
    filters,
    tags
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ toggleTag }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TagCloudFilter);
