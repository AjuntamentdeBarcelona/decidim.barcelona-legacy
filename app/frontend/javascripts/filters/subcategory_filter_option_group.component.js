import { Component }          from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';

import { setFilterGroup }     from './filters.actions';

import FilterOptionGroup      from './filter_option_group.component';
import FilterOption           from './filter_option.component';

class SubcategoryFilterOptionGroup extends Component {
  render() {
    let categoryId = this.props.filters.filter["category_id"] && this.props.filters.filter["category_id"][0];

    if (categoryId) {
      let subcategories = this.props.categories.filter((category) => categoryId === category.id)[0].subcategories;

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
    return null;
  }
}

function mapStateToProps({ categories, filters }) {
  return {
    categories,
    filters
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setFilterGroup }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SubcategoryFilterOptionGroup);
