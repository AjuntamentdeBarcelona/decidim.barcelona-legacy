import { Component } from 'react';
import RichEditor    from '../application/rich_editor.component';

export default class ProposalAnswerBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: this.props.answerMessage,
      status: this.props.answerStatus
    };
  }

  componentWillReceiveProps({ answerMessage, answerStatus }) {
    this.setState({ 
      message: answerMessage,
      status: answerStatus
    });
  }

  render() {
    return (
      <div className="proposal-answer-box">
        <h2>{ I18n.t("components.proposal_answer_box.title") }</h2>

        <RichEditor 
          onTextChange={(answerMessage) => this.setState({ message: answerMessage, status: null })}
          value={this.state.message} />

        {this.renderButton("accept", "accepted", this.state.status)}
        {this.renderButton("reject", "rejected", this.state.status)}
      </div>
    );
  }

  renderButton(action, status, currentStatus) {
    const { onButtonClick } = this.props;
    var classes = [action];

    if (status === currentStatus) {
      classes.push("selected");
    }

    return (
      <button 
        className={classes.join(" ")}
        onClick={(event) => onButtonClick({ message: this.state.message, status })}>
        {I18n.t(`components.proposal_answer_box.${action}`)}
      </button>
    );
  }
}
