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
    const { session, actionPlan, updateActionPlan } = this.props;
    const { id, scope_, district } = actionPlan;

    if (session.is_reviewer) {
      return (
        <div>
          <h2>{I18n.t('proposals.edit.editing')}</h2>
          <ScopePicker 
            scope={scope_} 
            onScopeSelected={scope => updateActionPlan(id, { scope })}
            district={district}
            onDistrictSelected={districtId => updateActionPlan(id, { district: districtId })} />
        </div>
      );
    }

    return null;
  }
}

function mapStateToProps({ session, actionPlan }) {
  return { session, actionPlan };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ 
    fetchDistricts,
    fetchCategories,
    updateActionPlan
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ActionPlanReviewer);
