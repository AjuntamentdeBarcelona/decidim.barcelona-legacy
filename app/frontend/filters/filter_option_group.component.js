import { Component, PropTypes } from 'react';

import Icon                     from '../application/icon.component';
import FilterOption             from './filter_option.component';

export default class FilterOptionGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterGroupValue: Immutable.Set(this.props.filterGroupValue)
    };
  }

  componentWillReceiveProps({ filterGroupValue }) {
    this.setState({ filterGroupValue: Immutable.Set(filterGroupValue) });
  }

  renderIncludeAll() {
    if (this.props.isExclusive && !this.props.hideIncludeAll) {
      return (
        <FilterOption 
          renderAs={this.props.renderAs || 'options'}
          isExclusive={true} 
          filterGroupName={this.props.filterGroupName}
          filterName={this.props.labelAllKey || "all" }
          onChangeFilter={() => this.clearFilter()}
          checked={this.state.filterGroupValue.count() === 0} />
      )
    }
    return null;
  }

  renderChildren() {
    return React.Children.map(this.props.children, (child) => {
      return React.cloneElement(child, {
        renderAs: this.props.renderAs || 'options',
        isExclusive: this.props.isExclusive,
        filterGroupName: this.props.filterGroupName,
        onChangeFilter: (filterName, filterValue) => this.changeFilter(filterName, filterValue),
        checked: this.state.filterGroupValue.has(child.props.filterName)
      })
    });
  }

  render() {
    if (this.props.useWrapper) {
      return (
        <div className="filter-group">
          {this.renderGroupAs(this.props.renderAs || 'options')}
        </div>
      )
    } else {
      return this.renderGroupAs(this.props.renderAs || 'options');
    }
  }

  renderGroupAs(renderAs) {
    switch(renderAs) {
      case 'options':
        return this.renderGroupAsOptions();
      case 'tabs':
        return this.renderGroupAsTabs();
    }
  }

  renderTitle() {
    if (this.props.useTitle) {
      return (
        <legend>
          <h6 className="heading6">
            {I18n.t(`components.filter_option_group.${this.props.filterGroupName}`)}
            {this.renderHelpIcon()}
          </h6>
        </legend>
      )
    }
    return null;
  }

  renderHelpIcon() {
    if (this.props.showHelp) {
      return (
        <span className="help">
          <Icon name="info" className="icon--after" />
        </span>
      );
    }
    return null;
  }

  renderGroupAsOptions() {
    return (
      <div className="filters__section">
        <fieldset>
          {this.renderTitle()}
          {this.renderIncludeAll()}
          {this.renderChildren()}
        </fieldset>
      </div>
    );
  }

  renderGroupAsTabs() {
    return (
      <ul>
        {this.renderIncludeAll()}
        {this.renderChildren()}
      </ul> 
    );
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

FilterOptionGroup.defaultProps = { 
  useWrapper: true,
  useTitle: true 
};

FilterOptionGroup.propTypes = {
  filterGroupValue: PropTypes.any,
  filterGroupName: PropTypes.string.isRequired,
  isExclusive: PropTypes.bool,
  hideIncludeAll: PropTypes.bool,
  renderAs: PropTypes.string,
  labelAllKey: PropTypes.string,
  children: PropTypes.any,
  useWrapper: PropTypes.bool,
  useTitle: PropTypes.bool,
  showHelp: PropTypes.bool,
  onChangeFilterGroup: PropTypes.func.isRequired
};
