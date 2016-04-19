import { Component }          from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';

import FilterOptionGroup      from './filter_option_group.component';
import FilterOption           from './filter_option.component';

import { setFilterGroup }     from './filters.actions';

class ActionPlanReviewFilter extends Component {
  render() {
    if (this.props.session.is_reviewer) {
      return (
        <div>
          <FilterOptionGroup
            filterGroupName="action_plan_source"
            filterGroupValue={this.props.filters.filter["action_plan_source"]}
            onChangeFilterGroup={(name, value) => this.props.setFilterGroup(name, value) }>
              <FilterOption filterName="official" />
          </FilterOptionGroup>

          <FilterOptionGroup
            isExclusive={true}
            filterGroupName="action_plan_approval" 
            filterGroupValue={this.props.filters.filter["action_plan_approval"]}
            onChangeFilterGroup={(name, value) => this.props.setFilterGroup(name, value) }>
            <FilterOption filterName="approved" />
            <FilterOption filterName="not_approved" />
          </FilterOptionGroup>
        </div>
      );
    }
    return null;
  }
}

function mapStateToProps({ filters, session }) {
  return { filters, session };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setFilterGroup }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ActionPlanReviewFilter);
