import { Component }                   from 'react';
import { connect }                     from 'react-redux';
import { bindActionCreators }          from 'redux';

import { fetchProposal, updateAnswer } from './proposals.actions';
import { fetchCategories }             from '../categories/categories.actions';
import { fetchDistricts }              from '../districts/districts.actions';

import ProposalAnswerBox               from './proposal_answer_box.component';
import CategoryPicker                  from '../categories/new_category_picker.component';
import ScopePicker                     from './scope_picker.component';
import Loading                         from '../application/loading.component';

class ProposalShow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true
    }
  }

  componentDidMount() {
    const { session } = this.props;

    if (session.is_reviewer) {
      this.props.fetchProposal(this.props.proposalId);
      this.props.fetchCategories();
      this.props.fetchDistricts();
    }
  }

  componentWillReceiveProps() {
    this.setState({ loading: false });
  }

  render() {
    const { session } = this.props;

    if (session.is_reviewer) {
      return (
        <div>
          <Loading show={this.state.loading} />
          <h2>{I18n.t('proposals.edit.editing')}</h2>
          <ScopePicker />
          <CategoryPicker />
          {this.renderAnswerBox()}
        </div>
      );
    }

    return null;
  }

  renderAnswerBox() {
    const { proposalId, proposal } = this.props;
    const { answer } = proposal;

    return (
      <ProposalAnswerBox 
        answerMessage={answer && answer.message}
        answerStatus={answer && answer.status}
        onButtonClick={(answerParams) => this.props.updateAnswer(proposalId, answer, answerParams)} 
      />
    );

    return null;
  }
}

function mapStateToProps({ session, proposal }) {
  return { session, proposal };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchProposal, updateAnswer, fetchCategories, fetchDistricts }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProposalShow);
