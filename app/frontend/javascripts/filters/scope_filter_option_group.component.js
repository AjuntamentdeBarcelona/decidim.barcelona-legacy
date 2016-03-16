import { Component }          from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';

import { fetchDistricts }     from '../proposals/proposals.actions';

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
            filterGroupValue={this.props.scopeFilterGroupValue}
            onChangeFilterGroup={(filterGroupName, filterGroupValue) => this.props.onChangeFilterGroup(filterGroupName, filterGroupValue) }>
            <FilterOption filterName="city" />
          </FilterOptionGroup>
          <FilterOptionGroup 
            useWrapper={false}
            useTitle={false}
            filterGroupName="district" 
            filterGroupValue={this.props.districtFilterGroupValue}
            onChangeFilterGroup={(filterGroupName, filterGroupValue) => this.props.onChangeFilterGroup(filterGroupName, filterGroupValue) }>
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

function mapStateToProps({ districts }) {
  return {
    districts
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchDistricts }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ScopeFilterOptionGroup);
