import { Component }                from 'react';
import { bindActionCreators }       from 'redux';
import { connect }                  from 'react-redux';

import { setFilterGroup }           from '../filters/filters.actions';

import SearchFilter                 from '../filters/search_filter.component';
import ScopeFilterOptionGroup       from '../filters/scope_filter_option_group.component';
import CategoryFilterOptionGroup    from '../filters/category_filter_option_group.component';
import SubcategoryFilterOptionGroup from '../filters/subcategory_filter_option_group.component';
import TagCloudFilter               from '../filters/tag_cloud_filter.component';

import FilterOptionGroup            from '../filters/filter_option_group.component';
import FilterOption                 from '../filters/filter_option.component';

class ProposalFilters extends Component {
  render() {
    return (
      <form className="proposal-filters">
        <SearchFilter searchText={this.props.filters.text} />
        <ScopeFilterOptionGroup />
        <CategoryFilterOptionGroup />
        <SubcategoryFilterOptionGroup />
        <FilterOptionGroup 
          filterGroupName="other" 
          filterGroupValue={this.props.filters.filter["other"]}
          onChangeFilterGroup={(name, value) => this.props.setFilterGroup(name, value) }>
          <FilterOption filterName="meetings" />
        </FilterOptionGroup>
      </form>
    )
  }
}

function mapStateToProps({ filters }) {
  return {
    filters
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setFilterGroup }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProposalFilters);

//renderTagCloudFilter() {
//  //if (this.props.tagsEnabled) {
//  //  return (
//  //    <TagCloudFilter 
//  //      currentTags={this.state.tags} 
//  //      tagCloud={this.props.tagCloud} 
//  //      onSetFilterTags={(tags) => this.onSetFilterTags(tags)} />
//  //  )
//  //}
//  return null;
//}

//cleanFilters() {
//  $(document).trigger('loading:show');
//  FilterServiceInstance.cleanState({ notify: true });
//  this.setState(FilterServiceInstance.state);
//}

//renderCleanFilterLink() {
//  //if ((this.state.searchText && this.state.searchText.length > 0) || this.state.filters.size > 0 || this.state.tags.size > 0) {
//  //  return (
//  //    <a onClick={() => this.cleanFilters()}>{I18n.t('components.proposal_filters.clean_filters')}</a>
//  //  )
//  //}
//  return null;
//}
