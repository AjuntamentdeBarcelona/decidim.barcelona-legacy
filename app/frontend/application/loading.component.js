import { Component } from 'react';

import classNames    from 'classnames';

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
          <span className="fa fa-spinner fa-spin"></span>
          <p>{this.props.text}</p>
        </div>
      )
    }
    return null;
  }
}
