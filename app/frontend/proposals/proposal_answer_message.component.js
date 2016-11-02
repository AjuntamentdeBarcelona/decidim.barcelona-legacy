import { PropTypes, Component } from 'react';
import htmlToReact from "../application/html_to_react";

function classNamesFor(status){
  let classNames = ["alert-box radius margin-top margin-bottom"];

  switch(status) {
    case "accepted":
      classNames.push("success");
      break;
    case "rejected":
      classNames.push("alert");
      break;
  }

  return classNames;
}

class ProposalAnswerMessage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { answer } = this.props;

    if(answer) {
      let { message, status } = answer;
      let notice = "";

      if(status == 'accepted') {
        notice = (
          <div className="section">
            <div className="callout success">
              <h5>{ I18n.t("components.proposal_answer_message.accepted") }</h5>
            </div>
          </div>
        );
      } else {
        if (message) {
          notice = (
            <div className="section">
              <div className="callout warning">
                <h5>{ I18n.t("components.proposal_answer_message.rejected") }</h5>
                { htmlToReact(message) }
              </div>
            </div>
          );
        }
      }

      return (
        <div className={classNamesFor(status).join(" ")}>
          { notice }
        </div>
      );
    } else {
      return null;
    }
  }
}

ProposalAnswerMessage.propTypes = {
  answer: PropTypes.object
};

export default ProposalAnswerMessage;
