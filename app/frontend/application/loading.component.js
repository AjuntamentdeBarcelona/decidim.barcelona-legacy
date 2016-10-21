import { Component, PropTypes } from 'react';

import Icon                     from './icon.component';

import classNames               from 'classnames';

export default class Loading extends Component {
  render() {
    const cssClasses = classNames(
      'loading-component',
      {
        list: this.props.list
      }
    );

    if (this.props.show) {
      return (
        <div className={cssClasses}>
          <div className="wrapper">
            <Icon name="loop-circular" removeIconClass={true} />
            <p>{this.props.text}</p>
          </div>
        </div>
      )
    }
    return null;
  }
}

Loading.propTypes = {
  list: PropTypes.bool,
  show: PropTypes.bool.isRequired,
  text: PropTypes.string
};
