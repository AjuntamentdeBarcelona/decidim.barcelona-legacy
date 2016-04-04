import { Component } from 'react';
import RichEditor    from '../application/rich_editor.component';

export default class ProposalAnswerBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: this.props.answerMessage
    };
  }

  componentWillReceiveProps({ answerMessage }) {
    this.setState({ message: answerMessage });
  }

  render() {
    const { answerStatus } = this.props;

    return (
      <div>
        <h2>Proposal Answer</h2>

        <RichEditor 
          onTextChange={(answerMessage) => this.setState({ message: answerMessage })}
          value={this.state.message} />

        {this.renderButton("accept", "accepted", answerStatus)}
        {this.renderButton("reject", "rejected", answerStatus)}
      </div>
    );
  }

  renderButton(action, status, currentStatus) {
    const { onButtonClick } = this.props;

    if (status === currentStatus) {
      return (
        <span className={action}>{action}</span>
      );
    } else {
      return (
        <button 
          className={action} 
          onClick={(event) => onButtonClick({ message: this.state.message, status })}>
          {action}
        </button>
      );
    }
  }
}
