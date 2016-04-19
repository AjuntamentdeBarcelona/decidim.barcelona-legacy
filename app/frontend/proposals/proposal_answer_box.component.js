import { Component } from 'react';
import RichEditor    from '../application/rich_editor.component';

export default class ProposalAnswerBox extends Component {
  constructor(props) {
    super(props);

    this.state = { ...this.props.answer };
  }

  componentWillReceiveProps({ answer }) {
    this.setState({ dirty: false, ...answer });
  }

  render() {
    return (
        <div className={this.classNames()}>
        <h2>{ I18n.t("components.proposal_answer_box.title") }</h2>

        <label>{ I18n.t("components.proposal_answer_box.templates")}</label>
        <select onChange={e => { this.selectTemplate(e.target.value) }}>
          <option>--- {I18n.t("components.proposal_answer_box.select_template")} ---</option>
          <option>No hi ha competències i l’Ajuntament no disposa de la capacitat d’influir.</option>
          <option>El govern municipal no està treballant en aquesta línia.</option>
          <option>La proposta és massa genèrica.</option>
          <option>L'Ajuntament no disposa dels recursos necessaris i està prioritzant altres actuacions.</option>
          <option>No podem comprometre’ns a desenvolupar aquesta proposta al nivell de concreció que es proposa, però serà tinguda en compte en el moment de la planificació corresponent.</option>
        </select>

        <label>{ I18n.t("components.proposal_answer_box.message_label") }</label>
        <RichEditor 
          onTextChange={(answerMessage) => this.setState({ message: answerMessage, dirty: true })}
          value={this.state.message} />

        <div className="save-buttons">
          <button onClick={() => this.approve()} className="approve">
            {I18n.t("components.proposal_answer_box.approve")}
          </button>
          {this.renderButton("accept", "accepted", this.state.status)}
          {this.renderButton("reject", "rejected", this.state.status)}
          {this.renderDirtyMessage() }
        </div>
      </div>
    );
  }

  selectTemplate(value){
    this.setState({ message: value, dirty: true});
  }

  classNames() {
    var classNames = ["proposal-answer-box"];
    if(this.state.official){ classNames.push("official") }
    return classNames.join(" ");
  }

  renderDirtyMessage() {
    if(this.state.dirty){
      return (
        <span>{ I18n.t("components.proposal_answer_box.pending_save") }</span>
      )
    }
  }

  renderButton(action, status, currentStatus) {
    var classes = [action];

    if (status === currentStatus) {
      classes.push("selected");
    }

    return (
      <button 
        className={classes.join(" ")}
      onClick={() => { this.save({ status, official: false }); }}>
        {I18n.t(`components.proposal_answer_box.${action}`)}
      </button>
    );
  }

  save(state){
    const { onButtonClick } = this.props;
    const { message, official, status } = this.state;

    this.setState({ dirty: true });

    onButtonClick({ status, message, official, ...state });
  }

  approve(){
    this.setState({ official: true});
    this.save({ official: true });
  }
}
