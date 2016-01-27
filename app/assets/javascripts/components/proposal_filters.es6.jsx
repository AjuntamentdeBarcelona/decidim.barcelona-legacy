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
      requestDataType: 'script'
    });
  }

  render() {
    return (
      <form className="proposal-filters">
        <SearchFilter 
          value={this.props.filter.search_filter}
          onSetFilterText={ (searchText) => this.filterService.setFilterText(searchText) } />
        <FilterOptionGroup 
          filterGroupName="source" 
          filterGroupValue={this.state.filters.get('source')}
          isExclusive={true}
          onChangeFilterGroup={(filterGroupName, filterGroupValue) => this.filterService.changeFilterGroup(filterGroupName, filterGroupValue) }>
          <FilterOption filterName="official" />
          <FilterOption filterName="citizenship" />
          <FilterOption filterName="meetings" />
        </FilterOptionGroup>
        <ScopeFilterOptionGroup 
          filterGroupValue={this.state.filters.get('scope')} 
          onChangeFilterGroup={(filterGroupName, filterGroupValue) => this.filterService.changeFilterGroup(filterGroupName, filterGroupValue) } />
        <DistrictFilterOptionGroup 
          scopeSelected={this.state.filters.get('scope')}
          districts={this.props.districts} 
          filterGroupValue={this.state.filters.get('district')}
          onChangeFilterGroup={(filterGroupName, filterGroupValue) => this.filterService.changeFilterGroup(filterGroupName, filterGroupValue) } />
        <CategoryFilterOptionGroup
          categories={this.props.categories}
          filterGroupValue={this.state.filters.get('category_id')} 
          onChangeFilterGroup={(filterGroupName, filterGroupValue) => this.filterService.changeFilterGroup(filterGroupName, filterGroupValue) } />
        <SubcategoryFilterOptionGroup
          selectedCategory={this.state.filters.get('category_id')}
          subcategories={this.props.subcategories}
          filterGroupValue={this.state.filters.get('subcategory_id')}
          onChangeFilterGroup={(filterGroupName, filterGroupValue) => this.filterService.changeFilterGroup(filterGroupName, filterGroupValue) } />
        <TagCloudFilter 
          currentTags={this.state.tags} 
          tagCloud={this.props.filter.tag_cloud} 
          onSetFilterTags={(tags) => this.filterService.setFilterTags(tags)} />
      </form>
    )
  }
}
