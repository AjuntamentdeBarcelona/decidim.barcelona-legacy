import { Component, PropTypes }     from 'react';
import { connect }                  from 'react-redux';

import * as actions                 from '../filters/filters.actions';

import SearchFilter                 from '../filters/search_filter.component';
import ScopeFilterOptionGroup       from '../filters/scope_filter_option_group.component';
import CategoryFilterOptionGroup    from '../filters/category_filter_option_group.component';
import SubcategoryFilterOptionGroup from '../filters/subcategory_filter_option_group.component';
import ActionPlanReviewFilter       from '../filters/action_plan_review_filter.component';

class ActionPlansFilters extends Component {
  render() {
    return (
      <form className="proposal-filters">
        <SearchFilter searchText={this.props.filters.text} />
        <ActionPlanReviewFilter/>
        <ScopeFilterOptionGroup />
        <CategoryFilterOptionGroup />
        <SubcategoryFilterOptionGroup />
        {this.renderClearFilterLink()}
      </form>
    )
  }

  renderClearFilterLink() {
    if (Object.keys(this.props.filters.filter).length > 0 || this.props.filters.text.length > 0) {
      return (
        <a onClick={() => this.props.clearFilters()}>{I18n.t('components.proposal_filters.clean_filters')}</a>
      )
    }
    return null;
  }
}

export default connect(
  ({ filters }) => ({ filters }),
  actions
)(ActionPlansFilters);

ActionPlansFilters.propTypes = {
  filters: PropTypes.object.isRequired,
  clearFilters: PropTypes.func.isRequired
};
