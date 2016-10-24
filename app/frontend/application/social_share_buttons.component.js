import { Component, PropTypes } from 'react';
import { createStore }          from 'redux';

import Icon                     from './icon.component';

export default class SocialShareButtons extends Component {
  componentDidMount() {
    const { modalId } = this.props;

    let $modal = $('#' + modalId)
    $modal.foundation();
  }

  render() {
    const { linkText, linkClassName, decidimIconsUrl, modalId } = this.props;
    const store = createStore(function () {
      return { 
        decidimIconsUrl
      };
    });

    return (
      <div className="share-buttons">
        <a className={linkClassName} data-open={modalId}>
          <span className="action-title">{linkText + ' '}</span>
          <span className="action-icon">
            <Icon name="share" store={store} />
          </span>
        </a>
        {this.renderModal(store)}
      </div>
    );
  }

  renderModal(store) {
    const { title, url, modalId } = this.props;
    const twitterUrl = this.buildTwitterUrl(title, url);
    const facebookUrl = this.buildFacebookUrl(title, url);
    const googleUrl = this.buildGoogleUrl(title, url);

    return (
      <div className="reveal" id={modalId} data-reveal="">
        <div className="reveal__header">
          <h3 className="reveal__title">{I18n.t('components.social_share_buttons.share')}:</h3>
          <button className="close-button" data-close="" aria-label="Close modal" type="button">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="button-group text-center">
          <a className="button button--twitter" target="_blank" href={twitterUrl}>
            <Icon name="twitter" store={store}  />
          </a>
          <a className="button button--facebook" target="_blank" href={facebookUrl}>
            <Icon name="facebook" store={store}  />
          </a>
          <a className="button button--google" target="_blank" href={googleUrl}>
            <Icon name="google" store={store}  />
          </a>
        </div>
      </div>
    );
  }

  buildTwitterUrl(title, url) {
    return `https://twitter.com/intent/tweet?url=${url}&text=${title}&original_referer=${url}`;
  }

  buildFacebookUrl(title, url) {
    return `https://www.facebook.com/sharer.php?u=${url}&title=${title}`;
  }

  buildGoogleUrl(title, url) {
    return `https://plus.google.com/share?url%3D${url}`;
  }
}
     
SocialShareButtons.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  decidimIconsUrl: PropTypes.string.isRequired,
  modalId: PropTypes.string.isRequired,
  linkText: PropTypes.string.isRequired,
  linkClassName: PropTypes.string
};
