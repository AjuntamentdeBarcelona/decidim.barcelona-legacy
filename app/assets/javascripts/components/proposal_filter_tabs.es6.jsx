class ProposalFilterTabs extends React.Component {
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
      <div className="proposal-filter-tabs">
        <FilterOptionGroup 
          renderAs="tabs"
          filterGroupName="source" 
          filterGroupValue={this.state.filters.get('source')}
          isExclusive={true}
          onChangeFilterGroup={(filterGroupName, filterGroupValue) => this.onChangeFilterGroup(filterGroupName, filterGroupValue) }>
          <FilterOption filterName="official" />
          <FilterOption filterName="citizenship" />
          <FilterOption filterName="organization" />
          <FilterOption filterName="meetings" filterLabel={I18n.t('components.filter_option.from_meetings')} />
        </FilterOptionGroup>
      </div>
    )
  }

  onChangeFilterGroup(filterGroupName, filterGroupValue) {
    $(document).trigger('loading:show');
    this.filterService.changeFilterGroup(filterGroupName, filterGroupValue);
  }
}

