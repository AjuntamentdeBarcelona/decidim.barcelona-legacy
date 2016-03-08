class ProposalFilters extends React.Component {
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
    FilterServiceInstance.subscribe('ProposalFilters', {
      requestUrl: this.props.filterUrl,
      requestDataType: 'script',
      onResultsCallback: (result) => {
        $(document).trigger('loading:hide');
        this.setState(FilterServiceInstance.state);
      }
    });
  }

  componentWillUnmount() {
    FilterServiceInstance.unsubscribe('ProposalFilters');
  }

  render() {
    return (
      <form className="proposal-filters">
        <SearchFilter 
          searchText={this.state.searchText}
          onSetFilterText={ (searchText) => this.onSetFilterText(searchText) } />
        <ScopeFilterOptionGroup 
          scopeFilterGroupValue={this.state.filters.get('scope')} 
          districtFilterGroupValue={this.state.filters.get('district')} 
          districts={this.props.districts} 
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
    this.setState(FilterServiceInstance.state);
  }

  onSetFilterText(searchText) {
    $(document).trigger('loading:show');
    FilterServiceInstance.setFilterText(searchText);
    this.setState(FilterServiceInstance.state);
  }

  onSetFilterTags(tags) {
    $(document).trigger('loading:show');
    FilterServiceInstance.setFilterTags(tags);
    this.setState(FilterServiceInstance.state);
  }

  cleanFilters() {
    $(document).trigger('loading:show');
    FilterServiceInstance.cleanState({ notify: true });
    this.setState(FilterServiceInstance.state);
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
