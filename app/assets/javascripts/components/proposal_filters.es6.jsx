class ProposalFilters extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText: this.props.filter.search_filter,
      tags: Immutable.Set(this.props.filter.tag_filter || []),
      filters : Immutable.Map(this.props.filter.params || {})
    };

    this.filterService = new FilterComponentService(this, {
      requestUrl: this.props.filterUrl,
      requestDataType: 'script',
      onResultsCallback: (result) => {
        $(document).trigger('loading:hide');
      }
    });
  }

  render() {
    return (
      <form className="proposal-filters">
        <SearchFilter 
          searchText={this.state.searchText}
          onSetFilterText={ (searchText) => this.onSetFilterText(searchText) } />
        <FilterOptionGroup 
          filterGroupName="source" 
          filterGroupValue={this.state.filters.get('source')}
          isExclusive={true}
          onChangeFilterGroup={(filterGroupName, filterGroupValue) => this.onChangeFilterGroup(filterGroupName, filterGroupValue) }>
          <FilterOption filterName="official" />
          <FilterOption filterName="citizenship" />
        </FilterOptionGroup>
        <ScopeFilterOptionGroup 
          filterGroupValue={this.state.filters.get('scope')} 
          onChangeFilterGroup={(filterGroupName, filterGroupValue) => this.onChangeFilterGroup(filterGroupName, filterGroupValue) } />
        <DistrictFilterOptionGroup 
          scopeSelected={this.state.filters.get('scope')}
          districts={this.props.districts} 
          filterGroupValue={this.state.filters.get('district')}
          onChangeFilterGroup={(filterGroupName, filterGroupValue) => this.onChangeFilterGroup(filterGroupName, filterGroupValue) } />
        <CategoryFilterOptionGroup
          categories={this.props.categories}
          filterGroupValue={this.state.filters.get('category_id')} 
          onChangeFilterGroup={(filterGroupName, filterGroupValue) => this.onChangeFilterGroup(filterGroupName, filterGroupValue) } />
        <SubcategoryFilterOptionGroup
          selectedCategory={this.state.filters.get('category_id')}
          subcategories={this.props.subcategories}
          filterGroupValue={this.state.filters.get('subcategory_id')}
          onChangeFilterGroup={(filterGroupName, filterGroupValue) => this.onChangeFilterGroup(filterGroupName, filterGroupValue) } />
        <FilterOptionGroup 
          filterGroupName="other" 
          filterGroupValue={this.state.filters.get('other')}
          onChangeFilterGroup={(filterGroupName, filterGroupValue) => this.onChangeFilterGroup(filterGroupName, filterGroupValue) }>
          <FilterOption filterName="meetings" />
        </FilterOptionGroup>
        {this.renderTagCloudFilter()}
      </form>
    )
  }

  renderTagCloudFilter() {
    if (this.props.tagsEnabled) {
      return (
        <TagCloudFilter 
          currentTags={this.state.tags} 
          tagCloud={this.props.filter.tag_cloud} 
          onSetFilterTags={(tags) => this.onSetFilterTags(tags)} />
      )
    }
    return null;
  }

  onSetFilterText(searchText) {
    $(document).trigger('loading:show');
    this.filterService.setFilterText(searchText);
  }

  onChangeFilterGroup(filterGroupName, filterGroupValue) {
    $(document).trigger('loading:show');
    this.filterService.changeFilterGroup(filterGroupName, filterGroupValue);
  }

  onSetFilterTags(tags) {
    $(document).trigger('loading:show');
    this.filterService.setFilterTags(tags);
  }
}
