import { Component }          from 'react';
import { connect }            from 'react-redux';

import { fetchDistricts }     from '../districts/districts.actions';
import { setFilterGroup }     from './filters.actions';

import FilterOptionGroup      from './filter_option_group.component';
import FilterOption           from './filter_option.component';

class ScopeFilterOptionGroup extends Component {
  componentDidMount() {
    this.props.fetchDistricts();
  }

  render() {
    return (
        <div className="filter-group">
          <FilterOptionGroup 
            useWrapper={false}
            filterGroupName="scope" 
            filterGroupValue={this.props.filters.filter["scope"]}
            onChangeFilterGroup={(name, value) => this.props.setFilterGroup(name, value) }>
            <FilterOption filterName="city" />
          </FilterOptionGroup>
          <FilterOptionGroup 
            useWrapper={false}
            useTitle={false}
            filterGroupName="district" 
            filterGroupValue={this.props.filters.filter["district"]}
            onChangeFilterGroup={(name, value) => this.props.setFilterGroup(name, value) }>
            {
              this.props.districts.map(function (district) {
                return <FilterOption key={district[1]} filterName={district[1]} filterLabel={district[0]} />
              })
            }
          </FilterOptionGroup>
        </div>
    )
  }
}

export default connect(
  ({ filters, districts }) => ({ filters, districts }),
  {
    fetchDistricts,
    setFilterGroup
  }
)(ScopeFilterOptionGroup);
