import { Component }          from 'react';
import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';

import ScopePicker            from './scope_picker.component';
import CategoryPicker         from '../categories/new_category_picker.component';
import ProposalAnswerBox      from './proposal_answer_box.component';

import { fetchDistricts }     from '../districts/districts.actions';
import { fetchCategories }    from '../categories/categories.actions';
import { updateAnswer }       from './proposals.actions';

class ProposalReviewer extends Component {
  componentDidMount() {
    this.props.fetchDistricts();
    this.props.fetchCategories();
  }

  render() {
    const { session, proposal, updateAnswer } = this.props;
    const { id, answer } = proposal;

    if (session.is_reviewer) {
      return (
        <div>
          <h2>{I18n.t('proposals.edit.editing')}</h2>
          <ScopePicker />
          <CategoryPicker />
          <ProposalAnswerBox 
            answerMessage={answer && answer.message}
            answerStatus={answer && answer.status}
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
    updateAnswer
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProposalReviewer);
