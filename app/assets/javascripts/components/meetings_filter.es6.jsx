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
          onSetFilterText={ (searchText) => this.onSetFilterText(searchText) } />
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
        <TagCloudFilter 
          currentTags={this.state.tags} 
          tagCloud={this.props.filter.tag_cloud} 
          onSetFilterTags={(tags) => this.onSetFilterTags(tags)} />
      </form>
    )
  }

  onSetFilterText(searchText) {
    this.props.onLoading();
    this.filterService.setFilterText(searchText);
  }

  onChangeFilterGroup(filterGroupName, filterGroupValue) {
    this.props.onLoading();
    this.filterService.changeFilterGroup(filterGroupName, filterGroupValue);
  }

  onSetFilterTags(tags) {
    this.props.onLoading();
    this.filterService.setFilterTags(tags);
  }
}
