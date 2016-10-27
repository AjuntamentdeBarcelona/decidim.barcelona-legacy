import { Component, PropTypes } from 'react';
import { connect }              from 'react-redux';

import Icon                     from '../application/icon.component';

class NewActionPlanButton extends Component {
  render() {
    const { session, participatoryProcess } = this.props;

    if (session.can_create_action_plan) {
      return (
        <a href={`/${participatoryProcess.id}/${participatoryProcess.step.id}/action_plans/new`} className="new-proposal title-action__action button small hollow">{I18n.t("action_plans.index.new") + ' '}
          <Icon name="plus"/>
        </a>
      );
    }
    return null;
  }
}

export default connect(
  ({ session, participatoryProcess }) => ({ session, participatoryProcess })
)(NewActionPlanButton);

NewActionPlanButton.propTypes = {
  session: PropTypes.object.isRequired,
  participatoryProcess: PropTypes.object.isRequired
};
