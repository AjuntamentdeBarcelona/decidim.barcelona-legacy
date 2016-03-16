import { Component }                from 'react';

import SearchFilter                 from '../filters/search_filter.component';
import ScopeFilterOptionGroup       from '../filters/scope_filter_option_group.component';
import CategoryFilterOptionGroup    from '../filters/category_filter_option_group.component';
import SubcategoryFilterOptionGroup from '../filters/subcategory_filter_option_group.component';
import FilterOptionGroup            from '../filters/filter_option_group.component';
import FilterOption                 from '../filters/filter_option.component';
import TagCloudFilter               from '../filters/tag_cloud_filter.component';

export default class ProposalFilters extends Component {
  constructor(props) {
    super(props);

    //FilterServiceInstance.initState(
    //  this.props.filter.search_filter,
    //  this.props.filter.tag_filter,
    //  this.props.filter.params
    //);

    //this.state = FilterServiceInstance.state;
  }

  componentDidMount() {
    //FilterServiceInstance.subscribe('ProposalFilters', {
    //  requestUrl: this.props.filterUrl,
    //  requestDataType: 'script',
    //  onResultsCallback: (result) => {
    //    $(document).trigger('loading:hide');
    //    this.setState(FilterServiceInstance.state);
    //  }
    //});
  }

  componentWillUnmount() {
    //FilterServiceInstance.unsubscribe('ProposalFilters');
  }

  render() {
    return (
      <form className="proposal-filters">
        <SearchFilter 
          searchText=""
          onSetFilterText={ (searchText) => this.onSetFilterText(searchText) } />
        <ScopeFilterOptionGroup 
          scopeFilterGroupValue={[]} 
          districtFilterGroupValue={[]} 
          districts={[]} 
          onChangeFilterGroup={(filterGroupName, filterGroupValue) => this.onChangeFilterGroup(filterGroupName, filterGroupValue) } />
        <CategoryFilterOptionGroup
          categories={[]}
          filterGroupValue={[]} 
          onChangeFilterGroup={(filterGroupName, filterGroupValue) => this.onChangeFilterGroup(filterGroupName, filterGroupValue) } />
        <SubcategoryFilterOptionGroup
          selectedCategory={[]}
          subcategories={[]}
          filterGroupValue={[]}
          onChangeFilterGroup={(filterGroupName, filterGroupValue) => this.onChangeFilterGroup(filterGroupName, filterGroupValue) } />
        <FilterOptionGroup 
          filterGroupName="other" 
          filterGroupValue={[]}
          onChangeFilterGroup={(filterGroupName, filterGroupValue) => this.onChangeFilterGroup(filterGroupName, filterGroupValue) }>
          <FilterOption filterName="meetings" />
        </FilterOptionGroup>
        {this.renderTagCloudFilter()}
        {this.renderCleanFilterLink()}
      </form>
    )
  }

  renderTagCloudFilter() {
    //if (this.props.tagsEnabled) {
    //  return (
    //    <TagCloudFilter 
    //      currentTags={this.state.tags} 
    //      tagCloud={this.props.tagCloud} 
    //      onSetFilterTags={(tags) => this.onSetFilterTags(tags)} />
    //  )
    //}
    return null;
  }

  onChangeFilterGroup(filterGroupName, filterGroupValue) {
    console.log("Not implemented...yet!");
    //$(document).trigger('loading:show');
    //FilterServiceInstance.changeFilterGroup(filterGroupName, filterGroupValue);
    //this.setState(FilterServiceInstance.state);
  }

  onSetFilterText(searchText) {
    console.log("Not implemented...yet!");
    //$(document).trigger('loading:show');
    //FilterServiceInstance.setFilterText(searchText);
    //this.setState(FilterServiceInstance.state);
  }

  onSetFilterTags(tags) {
    console.log("Not implemented...yet!");
    //$(document).trigger('loading:show');
    //FilterServiceInstance.setFilterTags(tags);
    //this.setState(FilterServiceInstance.state);
  }

  //cleanFilters() {
  //  $(document).trigger('loading:show');
  //  FilterServiceInstance.cleanState({ notify: true });
  //  this.setState(FilterServiceInstance.state);
  //}

  renderCleanFilterLink() {
    //if ((this.state.searchText && this.state.searchText.length > 0) || this.state.filters.size > 0 || this.state.tags.size > 0) {
    //  return (
    //    <a onClick={() => this.cleanFilters()}>{I18n.t('components.proposal_filters.clean_filters')}</a>
    //  )
    //}
    return null;
  }
}
