import { Component, PropTypes } from 'react';
import { connect }              from 'react-redux';

import Icon                     from '../application/icon.component';

class NewActionPlanButton extends Component {
  render() {
    const { session, participatoryProcessId, stepId } = this.props;

    if (session.can_create_action_plan) {
      return (
        <a href={`/${participatoryProcessId}/${stepId}/action_plans/new`} className="new-proposal title-action__action button small hollow">{I18n.t("action_plans.index.new") + ' '}
          <Icon name="plus"/>
        </a>
      );
    }
    return null;
  }
}

export default connect(
  ({ session, participatoryProcessId, stepId }) => ({ session, participatoryProcessId, stepId })
)(NewActionPlanButton);

NewActionPlanButton.propTypes = {
  session: PropTypes.object.isRequired,
  participatoryProcessId: PropTypes.string.isRequired,
  stepId: PropTypes.string.isRequired
};
