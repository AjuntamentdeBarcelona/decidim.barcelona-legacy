class MeetingsFilter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchText: this.props.filter.search_filter,
      tags: Immutable.Set(this.props.filter.tag_filter || []),
      filters : Immutable.Map(this.props.filter.params || {})
    };

    this.filterService = new FilterComponentService(this, {
      requestUrl: this.props.filterUrl,
      requestDataType: 'json',
      onResultsCallback: (result) => {
        this.props.onFilterResult(result);
      }
    });
  }

  render() {
    return (
      <form>
        <SearchFilter 
          searchText={this.state.searchText}
          onSetFilterText={ (searchText) => this.filterService.setFilterText(searchText) } />
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
