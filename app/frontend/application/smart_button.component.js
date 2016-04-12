import { Component } from 'react';

export default class SmartButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      disabled: false
    };
  }

  render() {
    return (
      <button 
        disabled={this.state.disabled}
        className={this.props.className}
        onClick={() => this.onClick()}>
        {this.props.children}
      </button>
    );
  }

  onClick() {
    this.setState({ disabled: true });
    this.props.onClick();
  }
}
