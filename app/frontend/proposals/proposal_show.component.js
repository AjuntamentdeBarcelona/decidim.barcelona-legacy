import { Component }                   from 'react';
import { connect }                     from 'react-redux';
import { bindActionCreators }          from 'redux';

import { fetchProposal, updateAnswer } from './proposals.actions';
import ProposalAnswerBox               from './proposal_answer_box.component';

class ProposalShow extends Component {
  componentDidMount() {
    this.props.fetchProposal(this.props.proposalId);
  }

  render() {
    const proposalId = this.props.proposalId;
    const answer = this.props.proposal.answer;

    return (
      <ProposalAnswerBox 
        answerMessage={answer && answer.message}
        answerStatus={answer && answer.status}
        onButtonClick={(answerParams) => this.props.updateAnswer(proposalId, answer, answerParams)} 
      />
    );
  }
}

function mapStateToProps({ proposal }) {
  return { proposal };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchProposal, updateAnswer }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProposalShow);
