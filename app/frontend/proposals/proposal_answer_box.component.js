import { Component } from 'react';
import RichEditor    from '../application/rich_editor.component';

export default class ProposalAnswerBox extends Component {
  constructor(props) {
    super(props);

    this.state = { ...this.props.answer };
  }

  componentWillReceiveProps({ answer }) {
    this.setState({ ...answer });
  }

  render() {
    return (
      <div className="proposal-answer-box">
        <h2>{ I18n.t("components.proposal_answer_box.title") }</h2>

        <label>{ I18n.t("components.proposal_answer_box.message_label") }</label>
        <RichEditor 
          onTextChange={(answerMessage) => this.setState({ message: answerMessage, status: null })}
          value={this.state.message} />

        <label>
          <input type="checkbox" checked={this.state.official} onChange={e => {
            this.setState({ official: e.target.checked, status: null })
          }}/>
          { I18n.t("components.proposal_answer_box.official")}
        </label>

        {this.renderButton("accept", "accepted", this.state.status)}
        {this.renderButton("reject", "rejected", this.state.status)}
      </div>
    );
  }

  renderButton(action, status, currentStatus) {
    var classes = [action];

    if (status === currentStatus) {
      classes.push("selected");
    }

    return (
      <button 
        className={classes.join(" ")}
        onClick={(event) => this.save(status)}>
        {I18n.t(`components.proposal_answer_box.${action}`)}
      </button>
    );
  }

  save(status){
    const { onButtonClick } = this.props;
    const { message, official } = this.state;

    onButtonClick({ status, message, official });
  }
}
