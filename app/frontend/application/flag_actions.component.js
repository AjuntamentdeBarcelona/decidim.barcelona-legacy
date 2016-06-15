import { Component, PropTypes } from 'react';
import { connect }              from 'react-redux';

class FlagActions extends Component {
  render() {
    const { flaggeable, session } = this.props;
    const { id, flagged, author } = flaggeable;

    if (session.signed_in && session.user.id !== author.id) {
      return (
        <span className="js-flag-actions">
          <span className="flag-content">
            {this.renderFlagAction(id, flagged)}
            {this.renderUnFlagAction(id, flagged)}
          </span>
        </span>
      );
    }

    return null;
  }

  renderFlagAction(id, flagged) {
    if (!flagged) {
      return (
        <a 
          id={`flag-action-${id}`}
          onClick={ () => this.props.flagAction(id) }
          title={ I18n.t('shared.flag') }>
          &nbsp;<i className="icon-flag flag-disable"></i>&nbsp;&nbsp;
        </a>
      );
    }

    return null;
  }

  renderUnFlagAction(id, flagged) {
    if (flagged) {
      return (
        <a 
          id={`unflag-action-${id}`}
          onClick={ () => this.props.unFlagAction(id) }
          title={ I18n.t('shared.unflag') }>
          &nbsp;<i className="icon-flag flag-active"></i>&nbsp;&nbsp;
        </a>
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
