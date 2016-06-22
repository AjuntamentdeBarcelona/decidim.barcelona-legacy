import { Component, PropTypes } from 'react';
import { connect }              from 'react-redux';

class NewActionPlanButton extends Component {
  render() {
    const { session, participatoryProcessId } = this.props;

    if (session.can_create_action_plan) {
      return (
        <a href={`/action_plans/new?participatory_process_id=${participatoryProcessId}`} className="new-proposal button radius expand">{I18n.t("action_plans.index.new")}</a>
      );
    }
    return null;
  }
}

export default connect(
  ({ session, participatoryProcessId }) => ({ session, participatoryProcessId })
)(NewActionPlanButton);

NewActionPlanButton.propTypes = {
  session: PropTypes.object.isRequired,
  participatoryProcessId: PropTypes.string.isRequired
};
