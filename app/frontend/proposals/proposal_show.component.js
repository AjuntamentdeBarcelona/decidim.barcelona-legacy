import { Component }                   from 'react';
import { connect }                     from 'react-redux';
import { bindActionCreators }          from 'redux';

import { fetchProposal, updateAnswer } from './proposals.actions';

import ProposalAnswerBox               from './proposal_answer_box.component';
import Loading                         from '../application/loading.component';

class ProposalShow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true
    }
  }

  componentDidMount() {
    this.props.fetchProposal(this.props.proposalId);
  }

  componentWillReceiveProps() {
    this.setState({ loading: false });
  }

  render() {
    return this.renderAnswerBox();
  }

  renderAnswerBox() {
    const { session, proposalId, proposal } = this.props;
    const { answer } = proposal;

    if (session.is_reviewer) {
      return (
        <div>
          <Loading show={this.state.loading} />
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
}

function mapStateToProps({ session, proposal }) {
  return { session, proposal };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchProposal, updateAnswer }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProposalShow);
