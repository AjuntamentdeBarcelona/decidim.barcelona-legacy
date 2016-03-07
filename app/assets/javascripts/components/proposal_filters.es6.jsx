class ProposalFilters extends React.Component {
constructor(props) {
    super(props);

    FilterServiceInstance.initState(
      this.props.filter.search_filter,
      this.props.filter.tag_filter,
      this.props.filter.params
    );

    this.state = FilterServiceInstance.state;

    this.subscriberId = FilterServiceInstance.subscribe({
      requestUrl: this.props.filterUrl,
      requestDataType: 'script',
      onResultsCallback: (result) => {
        $(document).trigger('loading:hide');
        this.setState(FilterServiceInstance.state);
      }
    });
  }

  render() {
    return (
      <form className="proposal-filters">
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
    $(document).trigger('loading:show');
    FilterServiceInstance.changeFilterGroup(filterGroupName, filterGroupValue);
  }

  onSetFilterText(searchText) {
    $(document).trigger('loading:show');
    FilterServiceInstance.setFilterText(searchText);
  }

  onSetFilterTags(tags) {
    $(document).trigger('loading:show');
    FilterServiceInstance.setFilterTags(tags);
  }

  cleanFilters() {
    $(document).trigger('loading:show');
    FilterServiceInstance.cleanState({ notify: true });
  }

  renderCleanFilterLink() {
    if ((this.state.searchText && this.state.searchText.length > 0) || this.state.filters.size > 0 || this.state.tags.size > 0) {
      return (
        <a onClick={() => this.cleanFilters()}>{I18n.t('components.proposal_filters.clean_filters')}</a>
      )
    }
    return null;
  }
}
