import { Component }                from 'react';
import { connect }                  from 'react-redux';

import * as actions                 from '../filters/filters.actions';

import SearchFilter                 from '../filters/search_filter.component';
import ScopeFilterOptionGroup       from '../filters/scope_filter_option_group.component';
import CategoryFilterOptionGroup    from '../filters/category_filter_option_group.component';
import SubcategoryFilterOptionGroup from '../filters/subcategory_filter_option_group.component';
import TagCloudFilter               from '../filters/tag_cloud_filter.component';

import FilterOptionGroup            from '../filters/filter_option_group.component';
import FilterOption                 from '../filters/filter_option.component';

class MeetingsFilters extends Component {
  render() {
    return (
      <form className="meeting-filters">
        <SearchFilter searchText={this.props.filters.text} />
        <FilterOptionGroup
          filterGroupName="date"
          filterGroupValue={this.props.filters.filter['date']}
          isExclusive={true}
          labelAllKey="upcoming"
          onChangeFilterGroup={(name, value) => this.props.setFilterGroup(name, value) }>
          <FilterOption filterName="past" />
        </FilterOptionGroup>
        <ScopeFilterOptionGroup />
        <CategoryFilterOptionGroup />
        <SubcategoryFilterOptionGroup />
        <TagCloudFilter />
        {this.renderClearFilterLink()}
      </form>
    )
  }

  renderClearFilterLink() {
    if (Object.keys(this.props.filters.filter).length > 0 || 
        this.props.filters.text.length > 0 ||
        this.props.filters.tags.length > 0) {
      return (
        <a onClick={() => this.props.clearFilters()}>{I18n.t('components.meetings_filters.clean_filters')}</a>
      )
    }
    return null;
  }
}

export default connect(
  ({ filters }) => ({ filters }),
  actions
)(MeetingsFilters);
