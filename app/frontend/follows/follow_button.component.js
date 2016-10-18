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
    const { session, followId } = this.props;

    if (session.signed_in) {
      if (!followId) {
        return this.renderFollowButton();
      } else {
        return this.renderUnFollowButton();
      }
    }

    return null;
  }

  renderFollowButton() {
    const { followingId, followingType, follow } = this.props;

    return (
      <SmartButton 
        className="follow button secondary hollow expanded small button--icon"
        onClick={() => follow({ followingId, followingType })}>
        <Icon name="bell" />
        <span>{I18n.t('components.follow_button.follow')}</span>
      </SmartButton>
    );
  }

  renderUnFollowButton() {
    const { followId, unFollow } = this.props;

    return (
      <SmartButton 
        className="unfollow button secondary hollow expanded small button--icon"
        onClick={() => unFollow(followId)}>
        <Icon name="bell" />
        <span>{I18n.t('components.follow_button.unfollow')}</span>
      </SmartButton>
    );
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
  followId: PropTypes.number,
  followingId: PropTypes.number.isRequired,
  followingType: PropTypes.string.isRequired,
  fetchFollow: PropTypes.func.isRequired,
  follow: PropTypes.func.isRequired,
  unFollow: PropTypes.func.isRequired
};
