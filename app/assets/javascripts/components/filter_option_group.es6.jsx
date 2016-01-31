class FilterOptionGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterGroupValue: Immutable.Set(this.props.filterGroupValue)
    };
  }

  renderIncludeAll() {
    if (this.props.isExclusive) {
      return (
        <FilterOption 
          isExclusive={true} 
          filterGroupName={this.props.filterGroupName}
          filterName="all"
          onChangeFilter={() => this.clearFilter()}
          checked={this.state.filterGroupValue.count() === 0} />
      )
    }
    return null;
  }

  renderChildren() {
    return React.Children.map(this.props.children, (child) => {
      return React.cloneElement(child, {
        isExclusive: this.props.isExclusive,
        filterGroupName: this.props.filterGroupName,
        onChangeFilter: (filterName, filterValue) => this.changeFilter(filterName, filterValue),
        checked: this.state.filterGroupValue.has(child.props.filterName)
      })
    });
  }

  render() {
    return (
      <div className="filter-group">
        <h3>{I18n.t(`components.filter_option_group.${this.props.filterGroupName}`)}</h3>
        {this.renderIncludeAll()}
        {this.renderChildren()}
      </div>
    )
  }

  changeFilter(filterName, isChecked) {
    let filterGroupValue = this.state.filterGroupValue;

    if (this.props.isExclusive) {
      filterGroupValue = filterGroupValue.clear();
    }

    if (isChecked) {
      filterGroupValue = filterGroupValue.add(filterName);
    } else {
      filterGroupValue = filterGroupValue.delete(filterName);
    }

    this.updateFilter(filterGroupValue);
  }

  clearFilter() {
    let filterGroupValue = this.state.filterGroupValue;

    filterGroupValue = filterGroupValue.clear();

    this.updateFilter(filterGroupValue);
  }

  updateFilter(filterGroupValue) {
    this.setState({ filterGroupValue });
    this.props.onChangeFilterGroup(
      this.props.filterGroupName, 
      filterGroupValue.toArray()
    );
  }
}
