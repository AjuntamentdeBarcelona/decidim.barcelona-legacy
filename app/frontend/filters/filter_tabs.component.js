import { Component }          from 'react';
import { connect }            from 'react-redux';

import { setFilterGroup }     from '../filters/filters.actions';

import FilterOptionGroup      from '../filters/filter_option_group.component';
import FilterOption           from '../filters/filter_option.component';

const FilterTabs = ({ 
  filters,
  setFilterGroup
}) => (
  <div className="filter-tabs">
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

export default connect(
  ({ filters }) => ({ filters }),
  { setFilterGroup }
)(FilterTabs);
