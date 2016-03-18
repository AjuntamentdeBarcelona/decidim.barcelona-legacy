import { Component }          from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';

import { fetchCategories }    from '../categories/categories.actions';
import { setFilterGroup }     from './filters.actions';

import FilterOptionGroup      from './filter_option_group.component';
import FilterOption           from './filter_option.component';

class CategoryFilterOptionGroup extends Component {
  componentDidMount() {
    this.props.fetchCategories();
  }

  render() {
    return (
      <FilterOptionGroup 
        filterGroupName="category_id" 
        filterGroupValue={this.props.filters.filter["category_id"]}
        isExclusive={true}
        onChangeFilterGroup={(name, value) => this.props.setFilterGroup(name, value) }>
        {
          this.props.categories.map(function (category) {
            return <FilterOption key={category.id} filterName={category.id} filterLabel={category.name}>
              <a href={`/categories#category_${category.id}`} target="_blank"><i className="fa fa-info-circle"></i></a>
            </FilterOption>
          })
        }
      </FilterOptionGroup>
    )
  }
}

function mapStateToProps({ filters, categories }) {
  return {
    filters,
    categories
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchCategories, setFilterGroup }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryFilterOptionGroup);
