import { Component }     from 'react';
import { connect }       from 'react-redux';

import FilterOptionGroup from './filter_option_group.component';
import FilterOption      from './filter_option.component';

import * as actions      from './filters.actions';

class ReviewerFilter extends Component {
  render() {
    if (this.props.session.signed_in) {
      return (
        <FilterOptionGroup 
          filterGroupName="interaction"
          filterGroupValue={this.props.filters.filter["interaction"]}
          onChangeFilterGroup={(name, value) => this.props.setFilterGroup(name, value) }>
          <FilterOption filterName="created" />
          <FilterOption filterName="voted" />
          <FilterOption filterName="commented" />
          <FilterOption filterName="followed" />
        </FilterOptionGroup>
      );
    }
    return null;
  }
}

export default connect(
  ({ filters, session }) => ({ filters, session }),
  actions
)(ReviewerFilter);
