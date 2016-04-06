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
import ProposalBadge                   from './proposal_badge.component';

class ProposalShow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true
    }
  }

  componentDidMount() {
    const { session } = this.props;

    this.props.fetchProposal(this.props.proposalId);

    if (session.is_reviewer) {
      this.props.fetchCategories();
      this.props.fetchDistricts();
    }
  }

  componentWillReceiveProps() {
    this.setState({ loading: false });
  }

  render() {
    const { proposalId, proposal } = this.props;
    const { url, title, source } = proposal;

    return (
      <div id={`proposal_${proposalId}`}>
        <Loading show={this.state.loading} />
        <div className="small-12 medium-9 column">
          <i className="icon-angle-left left"></i>&nbsp;
          <a className="left back">{I18n.t('proposals.show.back_link')}</a>

          <h2>
            <a href={url}>
              {title}
              <ProposalBadge source={source} />
            </a>
          </h2>

        </div>

        {this.renderReviewBox()}
      </div>
    );
  }

  renderReviewBox() {
    const { session, proposalId, proposal } = this.props;
    const { answer } = proposal;

    if (session.is_reviewer) {
      return (
        <div>
          <h2>{I18n.t('proposals.edit.editing')}</h2>
          <ScopePicker />
          <CategoryPicker />
          <ProposalAnswerBox 
            answerMessage={answer && answer.message}
            answerStatus={answer && answer.status}
            onButtonClick={(answerParams) => this.props.updateAnswer(proposalId, answer, answerParams)} 
          />
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
