import { Component, PropTypes } from 'react';
import { connect }              from 'react-redux';

import Icon                     from './icon.component';

class FlagActions extends Component {
  render() {
    const { flaggeable, session } = this.props;
    const { id, flagged, author } = flaggeable;
    const authorId = author ? author.id : null;

    if (session.signed_in && session.user.id !== authorId) {
      return (
        <span>
          {this.renderFlagAction(id, flagged)}
          {this.renderUnFlagAction(id, flagged)}
        </span>
      );
    }

    return null;
  }

  renderFlagAction(id, flagged) {
    if (!flagged) {
      return (
        <button 
          id={`flag-action-${id}`}
          onClick={ () => { this.props.flagAction(id) } }
          title={ I18n.t('shared.flag') }>
          <Icon name="flag" className="icon--small" ariaLabel={ I18n.t('shared.flag') } role="img" />
        </button>
      );
    }

    return null;
  }

  renderUnFlagAction(id, flagged) {
    if (flagged) {
      return (
        <button 
          id={`unflag-action-${id}`}
          onClick={ () => this.props.unFlagAction(id) }
          type="button"
          title={ I18n.t('shared.unflag') }>
          <Icon name="flag" className="icon--small" ariaLabel={ I18n.t('shared.flag') } role="img" />
        </button>
      );
    }

    return null;
  }
}

export default connect(
  ({ session }) => ({ session })
)(FlagActions);

FlagActions.propTypes = {
  session: PropTypes.object.isRequired,
  flaggeable: PropTypes.object.isRequired,
  flagAction: PropTypes.func.isRequired,
  unFlagAction: PropTypes.func.isRequired
};
