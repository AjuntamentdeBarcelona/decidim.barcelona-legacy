import { Component, PropTypes } from 'react';
import { connect }              from 'react-redux';

import SmartButton              from '../application/smart_button.component';
import Icon                     from '../application/icon.component';

import * as actions             from './follows.actions';

export class FollowButton extends Component {
  componentDidMount() {
    const { session, followingId, followingType, fetchFollow } = this.props;

    if (session.signed_in) {
      fetchFollow({ followingId, followingType });
    }
  }

  render() {
    const { session } = this.props;

    if (session.signed_in) {
      return (
        <div className="follow-component">
          {this.renderFollowButton()}
          {this.renderUnFollowButton()}
        </div>
      )
    }

    return null;
  }

  renderFollowButton() {
    const { followingId, followingType, followId, follow } = this.props;

    if (!followId) {
      return (
        <SmartButton
          className="follow"
          onClick={() => follow({ followingId, followingType })}>
          <Icon name="check">{I18n.t('components.follow_button.follow')}</Icon>
        </SmartButton>
      );
    }
    return null;
  }

  renderUnFollowButton() {
    const { followId, unFollow } = this.props;

    if (followId) {
      return (
        <SmartButton 
          className="unfollow"
          onClick={() => unFollow(followId)}>
          <Icon name="times">{I18n.t('components.follow_button.unfollow')}</Icon>
        </SmartButton>
      );
    }

    return null;
  }
}

function mapStateToProps(state, { followingType }) {
  const { session } = state;
  const resource = state[followingType.toLowerCase()];
  const followId = resource && resource.follow && resource.follow.id;

  return { 
    followId,
    session 
  };
}

export default connect(mapStateToProps, actions)(FollowButton);

FollowButton.propTypes = {
  session: PropTypes.object.isRequired,
  followId: PropTypes.string,
  followingId: PropTypes.number.isRequired,
  followingType: PropTypes.string.isRequired,
  fetchFollow: PropTypes.func.isRequired,
  follow: PropTypes.func.isRequired,
  unFollow: PropTypes.func.isRequired
};
