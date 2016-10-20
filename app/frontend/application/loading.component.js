import { Component, PropTypes } from 'react';

// import classNames               from 'classnames';

export default class Loading extends Component {
  render() {
    // const cssClasses = classNames(
    //   'loading-component',
    //   {
    //     list: this.props.list
    //   }
    // );

    if (this.props.show) {
      return (
        <noscript />
      )
      // return (
      //   <div className={cssClasses}>
      //     <span className="fa fa-spinner fa-spin"></span>
      //     <p>{this.props.text}</p>
      //   </div>
      // )
    }
    return null;
  }
}

Loading.propTypes = {
  list: PropTypes.bool,
  show: PropTypes.bool.isRequired,
  text: PropTypes.string
};
