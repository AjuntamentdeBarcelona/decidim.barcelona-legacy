import { Component }          from 'react';
import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';

const testAction = function (value) {
  return {
    type: 'SET_TEST',
    payload: value
  };
}

class Proposals extends Component {
  render() {
    return (
      <div id="test">
        <p>In progress {this.props.test}</p>
        <input onChange={(event) => this.onInputChange(event)} />
      </div>
    );
  }

  onInputChange(event) {
    this.props.testAction(event.target.value);
  }
}

function mapStateToProps({ test }) {
  return { test };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ testAction }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Proposals);
