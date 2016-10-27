import { Component, PropTypes } from 'react';
import { connect }              from 'react-redux';

import Icon                     from '../application/icon.component';

class NewProposalButton extends Component {
  render() {
    const { session, participatoryProcess } = this.props;

    if (session.can_create_new_proposals) {
      return (
        <a href={`/${participatoryProcess.id}/${participatoryProcess.step.id}/proposals/new`}
        className="new-proposal title-action__action button small hollow">{I18n.t("proposals.index.start_proposal")}
          <Icon name="plus"/>
        </a>
      );
    }
    return null;
  }
}

export default connect(
  ({ session, participatoryProcess }) => ({ session, participatoryProcess })
)(NewProposalButton);

NewProposalButton.propTypes = {
  session: PropTypes.object.isRequired,
  participatoryProcess: PropTypes.object.isRequired
};
