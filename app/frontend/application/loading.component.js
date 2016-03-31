import { Component } from 'react';

export default class Loading extends Component {
  render() {
    if (this.props.show) {
      return (
        <div className="loading-component">
          <span className="fa fa-spinner fa-spin"></span>
          <p>{this.props.text}</p>
        </div>
      )
    }
    return null;
  }
}
