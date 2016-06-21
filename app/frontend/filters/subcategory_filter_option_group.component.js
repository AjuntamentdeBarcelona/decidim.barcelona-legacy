import { Component, PropTypes } from 'react';
import { connect }              from 'react-redux';

import * as actions             from './filters.actions';

import FilterOptionGroup        from './filter_option_group.component';
import FilterOption             from './filter_option.component';

class SubcategoryFilterOptionGroup extends Component {
  render() {
    let categoryId = this.props.filters.filter["category_id"] && this.props.filters.filter["category_id"][0];

    if (this.props.categories && this.props.categories.length > 0 && categoryId) {
      let selectedCategory = this.props.categories.filter((category) => categoryId === category.id),
          subcategories;
      
      if (selectedCategory.length > 0) {
        subcategories = selectedCategory[0].subcategories;

        return (
          <FilterOptionGroup 
            filterGroupName="subcategory_id" 
            filterGroupValue={this.props.filters.filter["subcategory_id"]}
            onChangeFilterGroup={(name, value) => this.props.setFilterGroup(name, value) }>
            {
              subcategories.map(function (subcategory) {
                return <FilterOption key={subcategory.id} filterName={subcategory.id} filterLabel={subcategory.name}>
                  <a href={`/categories#subcategory_${subcategory.id}`} target="_blank"><i className="fa fa-info-circle"></i></a>
                </FilterOption>
              })
            }
          </FilterOptionGroup>
        )
      }
    }
    return null;
  }
}

export default connect(
  ({ categories, filters }) => ({ categories, filters }),
  actions
)(SubcategoryFilterOptionGroup);

SubcategoryFilterOptionGroup.propTypes = {
  filters: PropTypes.object.isRequired,
  categories: PropTypes.array,
  setFilterGroup: PropTypes.func.isRequired
};
