import { Component }          from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';

import { setFilterGroup }     from '../filters/filters.actions';

import FilterOptionGroup      from '../filters/filter_option_group.component';
import FilterOption           from '../filters/filter_option.component';

const ProposalFilterTabs = ({ 
  filters,
  setFilterGroup
}) => (
  <div className="proposal-filter-tabs">
    <FilterOptionGroup 
      renderAs="tabs"
      filterGroupName="source" 
      filterGroupValue={filters.filter["source"]}
      isExclusive={true}
      onChangeFilterGroup={(name, value) => setFilterGroup(name, value) }>
      <FilterOption filterName="official" />
      <FilterOption filterName="citizenship" />
      <FilterOption filterName="organization" />
      <FilterOption filterName="meetings" filterLabel={I18n.t('components.filter_option.from_meetings')} />
    </FilterOptionGroup>
  </div>
);

function mapStateToProps({ filters }) {
  return {
    filters
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setFilterGroup }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProposalFilterTabs);
