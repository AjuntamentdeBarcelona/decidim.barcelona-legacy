import { Component }                    from 'react';
import { connect }                      from 'react-redux';
import { bindActionCreators }           from 'redux';

import ScopePicker                      from '../scope/scope_picker.component';
import CategoryPicker                   from '../categories/new_category_picker.component';
import ProposalAnswerBox                from './proposal_answer_box.component';

import { fetchDistricts }               from '../districts/districts.actions';
import { fetchCategories }              from '../categories/categories.actions';
import { updateAnswer, updateProposal } from './proposals.actions';

class ProposalReviewer extends Component {
  componentDidMount() {
    this.props.fetchDistricts();
    this.props.fetchCategories();
  }

  render() {
    const { session, proposal, updateAnswer, updateProposal } = this.props;
    const { id, answer, scope_, district, category, subcategory } = proposal;

    if (session.is_reviewer) {
      return (
        <div>
          <h2>{I18n.t('proposals.edit.editing')}</h2>
          <ScopePicker 
            scope={scope_} 
            onScopeSelected={scope => updateProposal(id, { scope })}
            district={district}
            onDistrictSelected={districtId => updateProposal(id, { district: districtId })} />
          <CategoryPicker 
            category={category}
            subcategory={subcategory}
            onCategorySelected={({categoryId, subcategoryId}) => updateProposal(id, { category_id: categoryId, subcategory_id: subcategoryId })}
            onSubcategorySelected={subcategoryId => updateProposal(id, {subcategory_id: subcategoryId})}
          />
          <ProposalAnswerBox 
            answer={answer}
            onButtonClick={(answerParams) => updateAnswer(proposal.id, answer, answerParams)} 
          />
        </div>
      );
    }

    return null;
  }
}

function mapStateToProps({ session, proposal }) {
  return { session, proposal };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ 
    fetchDistricts,
    fetchCategories, 
    updateAnswer,
    updateProposal
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProposalReviewer);
