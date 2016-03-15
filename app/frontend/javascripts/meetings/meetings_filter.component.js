import { Component }             from 'react';

import SearchFilter              from '../filters/search_filter.component';
import FilterOptionGroup         from '../filters/filter_option_group.component';
import FilterOption              from '../filters/filter_option.component';
import ScopeFilterOptionGroup    from '../filters/scope_filter_option_group.component';
import CategoryFilterOptionGroup from '../filters/category_filter_option_group.component';
import TagCloudFilter            from '../filters/tag_cloud_filter.component';

export default class MeetingsFilter extends Component {
  constructor(props) {
    super(props);

    FilterServiceInstance.initState(
      this.props.filter.search_filter,
      this.props.filter.tag_filter,
      this.props.filter.params
    );

    this.state = FilterServiceInstance.state;
  }

  componentDidMount() {
    FilterServiceInstance.subscribe('MeetingFilters', {
      requestUrl: this.props.filterUrl,
      requestDataType: 'json',
      onResultsCallback: (result) => {
        this.props.onFilterResult(result);
        this.setState(FilterServiceInstance.state);
      }
    });
  }

  componentWillUnmount() {
    FilterServiceInstance.unsubscribe('MeetingFilters');
  }

  render() {
    return (
      <form>
        <SearchFilter 
          searchText={this.state.searchText}
          onSetFilterText={ (searchText) => this.onSetFilterText(searchText) } />
        <FilterOptionGroup
          filterGroupName="date"
          filterGroupValue={this.state.filters.get('date')}
          isExclusive={true}
          labelAllKey="upcoming"
          onChangeFilterGroup={(filterGroupName, filterGroupValue) => this.onChangeFilterGroup(filterGroupName, filterGroupValue) }>
          <FilterOption filterName="past" />
        </FilterOptionGroup>
        <ScopeFilterOptionGroup 
          scopeFilterGroupValue={this.state.filters.get('scope')} 
          districtFilterGroupValue={this.state.filters.get('district')} 
          districts={this.props.districts} 
          onChangeFilterGroup={(filterGroupName, filterGroupValue) => this.onChangeFilterGroup(filterGroupName, filterGroupValue) } />
        <CategoryFilterOptionGroup
          categories={this.props.categories}
          filterGroupValue={this.state.filters.get('category_id')} 
          onChangeFilterGroup={(filterGroupName, filterGroupValue) => this.onChangeFilterGroup(filterGroupName, filterGroupValue) } />
        {this.renderTagCloudFilter()}
        {this.renderCleanFilterLink()}
      </form>
    )
  }

  renderTagCloudFilter() {
    if (this.props.tagsEnabled) {
      return (
        <TagCloudFilter 
          currentTags={this.state.tags} 
          tagCloud={this.props.tagCloud} 
          onSetFilterTags={(tags) => this.onSetFilterTags(tags)} />
      )
    }
    return null;
  }

  onChangeFilterGroup(filterGroupName, filterGroupValue) {
    this.props.onLoading();
    FilterServiceInstance.changeFilterGroup(filterGroupName, filterGroupValue);
    this.setState(FilterServiceInstance.state);
  }

  onSetFilterText(searchText) {
    this.props.onLoading();
    FilterServiceInstance.setFilterText(searchText);
    this.setState(FilterServiceInstance.state);
  }

  onSetFilterTags(tags) {
    this.props.onLoading();
    FilterServiceInstance.setFilterTags(tags);
    this.setState(FilterServiceInstance.state);
  }

  cleanFilters() {
    this.props.onLoading();
    FilterServiceInstance.cleanState({ notify: true });
    this.setState(FilterServiceInstance.state);
  }

  renderCleanFilterLink() {
    if ((this.state.searchText && this.state.searchText.length > 0) || this.state.filters.size > 0 || this.state.tags.size > 0) {
      return (
        <a onClick={() => this.cleanFilters()}>{I18n.t('components.meetings_filters.clean_filters')}</a>
      )
    }
    return null;
  }
}
