import { Component, PropTypes } from 'react';

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
        {...this.props}
        disabled={this.state.disabled}>
        {this.props.children}
      </button>
    );
  }

  onClick() {
    this.setState({ disabled: true });
    this.props.onClick();
  }
}

SmartButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.any
};
