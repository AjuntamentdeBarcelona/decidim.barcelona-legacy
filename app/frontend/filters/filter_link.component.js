import { Component }          from 'react';
import { connect }            from 'react-redux';

import { setFilterGroup }     from './filters.actions';

class FilterLink extends Component {
  render() {
    return (
      <a className={this.isActive() ? "active" : ""}
        onClick={() => this.toggleFilter()}>
        <i className={this.props.cssClass} />
        {this.props.label}
      </a>
    );
  }

  isActive() {
    let filter = this.props.filters.filter[this.props.name];
    return filter && filter.indexOf(this.props.value) !== -1;
  }

  toggleFilter() {
    if (this.isActive()) {
      this.props.setFilterGroup(this.props.name, [])
    } else {
      if (this.props.name === 'subcategory_id') {
        let category = this.props.categories.filter((category) => {
          return category.subcategories.map(s => s.id).indexOf(this.props.value) !== -1;
        })[0];
        this.props.setFilterGroup('category_id', [category.id]);
      }
      this.props.setFilterGroup(this.props.name, [this.props.value])
    }
  }
}

export default connect(
  ({ categories, filters }) => ({ filters, categories }),
  { setFilterGroup }
)(FilterLink);
