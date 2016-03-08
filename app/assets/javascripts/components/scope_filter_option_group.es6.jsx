class ScopeFilterOptionGroup extends React.Component {
  render() {
    return (
        <div className="filter-group">
          <FilterOptionGroup 
            useWrapper={false}
            filterGroupName="scope" 
            filterGroupValue={this.props.scopeFilterGroupValue}
            onChangeFilterGroup={(filterGroupName, filterGroupValue) => this.props.onChangeFilterGroup(filterGroupName, filterGroupValue) }>
            <FilterOption filterName="city" />
          </FilterOptionGroup>
          <FilterOptionGroup 
            useWrapper={false}
            useTitle={false}
            filterGroupName="district" 
            filterGroupValue={this.props.districtFilterGroupValue}
            onChangeFilterGroup={(filterGroupName, filterGroupValue) => this.props.onChangeFilterGroup(filterGroupName, filterGroupValue) }>
            {
              this.props.districts.map(function (district) {
                return <FilterOption key={district[1]} filterName={district[1]} filterLabel={district[0]} />
              })
            }
          </FilterOptionGroup>
        </div>
    )
  }
}
