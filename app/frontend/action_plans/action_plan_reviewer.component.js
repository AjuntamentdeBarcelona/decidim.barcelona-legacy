import { Component }          from 'react';
import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';

import ScopePicker            from '../scope/scope_picker.component';
import CategoryPicker         from '../categories/new_category_picker.component';

import { fetchDistricts }     from '../districts/districts.actions';
import { fetchCategories }    from '../categories/categories.actions';
import { updateActionPlan }   from './action_plans.actions';

class ActionPlanReviewer extends Component {
  componentDidMount() {
    this.props.fetchDistricts();
    this.props.fetchCategories();
  }

  render() {
    const { visible, actionPlan, updateActionPlan } = this.props;
    const { id, scope_, district, category, subcategory } = actionPlan;

    if (visible) {
      return (
        <div>
          <h2>{I18n.t('action_plans.edit.editing')}</h2>
          <ScopePicker 
            namespace="action_plan"
            scope={scope_} 
            onScopeSelected={scope => updateActionPlan(id, { scope })}
            district={district}
            onDistrictSelected={districtId => updateActionPlan(id, { district: districtId })} />
          <CategoryPicker 
            category={category}
            subcategory={subcategory}
            onCategorySelected={({categoryId, subcategoryId}) => updateActionPlan(id, { category_id: categoryId, subcategory_id: subcategoryId })}
            onSubcategorySelected={subcategoryId => updateActionPlan(id, {subcategory_id: subcategoryId})}
          />
        </div>
      );
    }

    return null;
  }
}

function mapStateToProps({ actionPlan }) {
  return { actionPlan };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ 
    fetchDistricts,
    fetchCategories,
    updateActionPlan
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ActionPlanReviewer);
