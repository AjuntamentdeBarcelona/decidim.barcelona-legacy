import { Component, PropTypes } from 'react';
import { connect }              from 'react-redux';

class NewProposalButton extends Component {
  render() {
    const { session, participatoryProcessId } = this.props;

    if (session.can_create_new_proposals) {
      return (
        <a href={`/${participatoryProcessId}/proposals/new`} className="new-proposal button radius expand">{I18n.t("proposals.index.start_proposal")}</a>
      );
    }
    return null;
  }
}

export default connect(
  ({ session, participatoryProcessId }) => ({ session, participatoryProcessId })
)(NewProposalButton);

NewProposalButton.propTypes = {
  session: PropTypes.object.isRequired,
  participatoryProcessId: PropTypes.string.isRequired
};
